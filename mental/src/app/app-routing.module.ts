import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandComponent } from './land/land.component';
import { Phq9Component } from './phq9/phq9.component';  // Import PHQ-9 Component
import { Gad7Component } from './gad7/gad7.component';  // Import GAD-7 Component
import { ArticlesBlogComponent } from './articles-blog/articles-blog.component';


const routes: Routes = [
  { path: '', redirectTo: '/land', pathMatch: 'full' }, // Default route
  { path: 'land', component: LandComponent },  // Route to the About page
  { path: 'phq9', component: Phq9Component },    // Route to the PHQ-9 test page
  { path: 'gad7', component: Gad7Component },   // Route to the GAD-7 test page
  { path: 'articles-blog', component: ArticlesBlogComponent },    
  { path: '**', redirectTo: '/land' },           // Wildcard route for handling 404 - Not Found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
