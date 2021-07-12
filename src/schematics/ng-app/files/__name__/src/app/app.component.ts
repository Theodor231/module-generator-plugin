import { Component } from '@angular/core';
import { LoaderService } from './_services/helpers/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = '<%= lowerCase(name) %>';

  constructor(private loader: LoaderService) {
    loader.globalLoader.next(true);
  }
}
