import { Directive, HostListener, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTest]'
})

export class TestDirective {

  constructor(private el: ElementRef) { 
    console.log(el)
  }

}
