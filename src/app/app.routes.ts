import { Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { OperatorDashboardComponent } from './operator-dashboard/operator-dashboard.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';

export const routes: Routes = [
  { path: '', component: LogInComponent },
  { path: 'log-in', component: LogInComponent },
  {
    path: 'userDashboard',
    component: UserDashboardComponent,
  },
  { path: 'operatorDashboard', component: OperatorDashboardComponent },
  { path: 'managerDashboard', component: ManagerDashboardComponent },
];
