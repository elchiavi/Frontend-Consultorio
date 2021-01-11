import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');

  constructor() {

    const url = localStorage.getItem('theme') || './assets/css/colors/green.css';
    this.linkTheme.setAttribute('href', url);
  }

  changeTheme(theme: string ) {

     const url = `./assets/css/colors/${theme}.css`;
     this.linkTheme.setAttribute('href', url); // cambio el tema seteando la url.
     localStorage.setItem('theme', url); // guardo en localstorage para recordad el theme.
     this.checkCurrentTheme();
  }

  checkCurrentTheme() {

    const links = document.querySelectorAll('.selector'); // me quedo con todos los selectores.css

    links.forEach( elem => {

      elem.classList.remove('working'); // elimino la clase working, es el check
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme.getAttribute('href');

      if (btnThemeUrl === currentTheme) {
          elem.classList.add('working');
      }
    });

  }
}
