import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: [
  ]
})
export class SettingsComponent implements OnInit {

  constructor(private settServ: SettingsService) { }

  ngOnInit(): void {

    this.settServ.checkCurrentTheme();
  }

  changeTheme(theme: string ) {

    this.settServ.changeTheme(theme);
  }

}
