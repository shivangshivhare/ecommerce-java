import { Routes } from '@angular/router';
import { Logincomponent } from './user/login/login';
import { Profilecomponent } from './user/profile/profile';
import { Registercomponent } from './user/register/register';

export const routes: Routes = [
{ path: '', component: Logincomponent },
{path:'login',component:Logincomponent},
{path:'register',component:Registercomponent},
{path:'profile',component:Profilecomponent  }

];
