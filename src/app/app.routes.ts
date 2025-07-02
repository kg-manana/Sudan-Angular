import { provideRouter, Routes } from '@angular/router';
import { UserList } from './user-list/user-list';
import { UserCreate } from './user-create/user-create';
import { UserUpdate } from './user-update/user-update';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app';

export const routes: Routes = [
    {path: '', redirectTo: 'users', pathMatch: 'full'},
    {path: 'users', component: UserList},
    {path: 'users/create', component: UserCreate},
    {path: 'users/update/:id', component: UserUpdate}
];

export const AppRoutes = provideRouter(routes)

bootstrapApplication(App, {
    providers: [AppRoutes]
})
