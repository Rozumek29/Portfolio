import {
  Component, Directive, ElementRef, HostListener, Inject,
  OnInit, ViewChild,
  ViewChildren
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  @ViewChildren('section') sections: ElementRef[];
  @ViewChild('main') main: ElementRef;
  @ViewChild('navigation') navigation: ElementRef;

  loader: boolean = false;
  windowHeight: number = window.innerHeight;

  constructor() {

  }

  ngOnInit() : void {
    this.loader = false;
    setTimeout(() => this.loader = false, 3000)
  }

  @HostListener('mousewheel', [])
  onScroll() : void {
    const scrollTop = this.main.nativeElement.scrollTop;
    this.sections.forEach((section: ElementRef, index: number) : void => {
      if ((section.nativeElement.offsetTop < this.main.nativeElement.scrollTop + this.windowHeight / 2) && (scrollTop < section.nativeElement.offsetTop + this.windowHeight / 2)){
        this.resetNavigation();
        this.navigation.nativeElement.children[index].classList.add('selected');
      }
    })
  }

  resetNavigation() : void {
    for (let i: number = 0; i < this.navigation.nativeElement.children.length; i++) {
      this.navigation.nativeElement.children[i].classList.remove('selected');
    }
  }

  scrollToSection(index: number) : void {
    this.resetNavigation();
    const section = this.sections.find((e, i) => i == index );
    section?.nativeElement.scrollIntoView({
      behavior: 'smooth',
    })
    this.navigation.nativeElement.children[index].classList.add('selected');
  }
}
