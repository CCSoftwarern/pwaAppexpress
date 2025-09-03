import { Routes } from '@angular/router';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';

export const routes: Routes = [
     {

        path: 'login',
        title: 'Login',
        component: LoginComponent
    },

    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'principal/:id',
        title: 'Principal',
        component: PrincipalComponent
    }

];
