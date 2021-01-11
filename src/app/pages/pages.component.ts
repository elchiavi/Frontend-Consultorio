import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';
import { SettingsService } from '../services/settings.service';
declare function seteoConfiguracionesCustom();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  year = new Date().getFullYear();

  constructor( private servSett: SettingsService,
               private sidebarService: SidebarService ) { }

  ngOnInit(): void {
    seteoConfiguracionesCustom(); // esta función está definida en custom.js
    this.sidebarService.cargarMenu();
  }

}
