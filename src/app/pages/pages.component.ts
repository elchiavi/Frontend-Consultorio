import { Component, OnInit } from '@angular/core';
declare function seteoConfiguracionesCustom();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    seteoConfiguracionesCustom(); // esta función está definida en custom.js
  }

}
