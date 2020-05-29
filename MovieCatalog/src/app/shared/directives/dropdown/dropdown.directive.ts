import { Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  exportAs: 'appDropdown'
})
export class DropdownDirective {

  @HostBinding('class.show') isOpen = false;

  @HostListener('click', ['$event']) clickInside(event: Event){
    this.isOpen = !this.isOpen;
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event']) clickOutside(event: Event) {
    this.isOpen = false;
  }

  constructor() {   }

}
