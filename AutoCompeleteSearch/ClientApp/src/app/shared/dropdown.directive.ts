import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[clickOutside]',
  standalone: true
})
export class ClickOutsideDirective {
  @Output() public clickOutside = new EventEmitter();
  constructor(private _elementRef: ElementRef) { }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: any) {
    const isClickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (!isClickedInside) {
      this.clickOutside.emit(null);
    }
  }
}
