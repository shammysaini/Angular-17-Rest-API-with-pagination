import { Routes } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { SignupComponent } from './component/signup/signup.component';
import { CombineComponent } from './component/combine/combine.component';
import { FetchEmployeeComponent } from './component/fetch-employee/fetch-employee.component';
import { UpdateEmployeeComponent } from './component/update-employee/update-employee.component';
import { FindEmployeeComponent } from './component/find-employee/find-employee.component';


export const routes: Routes = [

    {path:'',title:'Home',component:CombineComponent},
    {path:'save',title:'Sign-up',component:SignupComponent},
    {path:'employee',title:'all-employee',component:FetchEmployeeComponent},
    {path:'employee/update/:id',component:UpdateEmployeeComponent},
    {path:'employee/:id',component:FindEmployeeComponent},
    
    
];
