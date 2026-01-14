import { Routes } from '@angular/router';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { SearchComponent } from './componentes/search/search.component';
import { PersonComponent } from './componentes/person/person.component';

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
        path: 'principal',
        title: 'Principal',
        component: PrincipalComponent
    },
    {
        path: 'search',
        title: 'Pesquisar',
        component: SearchComponent
    },
    {
        path: 'person',
        title: 'Perfil',
        component: PersonComponent
    }

];
