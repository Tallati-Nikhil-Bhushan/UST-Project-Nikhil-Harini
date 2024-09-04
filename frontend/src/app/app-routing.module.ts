import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { MealDetailsComponent } from './meal-details/meal-details.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'add-activity', component: AddActivityComponent,canActivate: [AuthGuard]},
  { path: 'activity-details', component: ActivityDetailsComponent,canActivate: [AuthGuard]},
  { path: 'meal-details/:mealType', component: MealDetailsComponent,canActivate: [AuthGuard]},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
