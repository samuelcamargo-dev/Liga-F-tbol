import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
// La ruta correcta desde src/ es:
import { AppComponent } from './app/web/app'; 

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));