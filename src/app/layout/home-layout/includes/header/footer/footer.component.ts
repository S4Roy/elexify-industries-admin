import { Component } from '@angular/core';
import { DeviceDetectorService } from 'app/core/services/device-detector.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  constructor(public device: DeviceDetectorService) {}
}
