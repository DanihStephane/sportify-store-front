import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    // autres composants
  ],
  imports: [
    BrowserModule,
    HttpClientModule
    // autres modules nécessaires (FormsModule, RouterModule, etc.)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
