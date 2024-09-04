import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // Import the routing module
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { Phq9Component } from './phq9/phq9.component';
import { Phq9Service } from './Phq9.service';
import { Gad7Component } from './gad7/gad7.component';
import { LandComponent } from './land/land.component';
import { ArticlesBlogComponent } from './articles-blog/articles-blog.component';
import { FormsModule } from '@angular/forms';
import { DepressionDialogComponent } from './depression-dialog/depression-dialog.component';
import { AnxietyDialogComponent } from './anxiety-dialog/anxiety-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LandComponent,
    Phq9Component,
    Gad7Component,
    ArticlesBlogComponent,
    DepressionDialogComponent,
    AnxietyDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Add the routing module here
    FormsModule,
    HttpClientModule
  ],
  providers: [Phq9Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
