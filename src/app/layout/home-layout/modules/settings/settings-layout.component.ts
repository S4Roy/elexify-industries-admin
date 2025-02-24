import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SettingsService } from '../../../../core/services/settings.service';

@Component({
  selector: 'app-settings-layout',
  imports: [RouterOutlet],
  templateUrl: './settings-layout.component.html',
  styleUrl: './settings-layout.component.scss'
})
export class SettingsLayoutComponent {
constructor(private settingService:SettingsService){

}
fetchCMSDetails(){
}
}
