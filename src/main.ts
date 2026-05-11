import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from '../src/app/web/app';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
