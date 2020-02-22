import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackgroundComponent } from './background-component/background.component';
import { SnakeComponent } from './background-component/snake-component/snake.component';
import { SkyComponent } from './background-component/sky-component/sky.component';

@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
    SnakeComponent,
    SkyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
