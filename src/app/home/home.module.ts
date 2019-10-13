import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule, MatIconModule, MatInputModule } from '@angular/material';

import { HomePage } from './home.page';
import { ReligionComponent } from '../religion/religion.component';
import { FilterNamesComponent } from '../filter-names/filter-names.component';
import { GenderComponent } from '../gender/gender.component';
import { AddNameComponent } from '../add-name/add-name.component';
import { NameDetailsComponent } from '../name-details/name-details.component';
import { NameDetailsItemComponent } from '../name-details-item/name-details-item.component';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { AuthGuardService } from '../guard/auth-guard.service';
import { GoogleLoginComponent } from '../google-login/google-login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
        children:[
          {
            path: '',
            component: GenderComponent
          },
          {
            path: 'filter/:gender',
            component: ReligionComponent
          },
          {
            path: 'filter/:gender/:religion',
            component: FilterNamesComponent
          },
          {
            path: 'filter/:gender/:religion/:name', component: NameDetailsComponent
          }     
        ]
      },
      {
        path: 'signup', component: SignupComponent
      },
      {
        path: 'login', component: GoogleLoginComponent
      },
      {
        path: 'add-name/:username', component: AddNameComponent, canActivate: [AuthGuardService]
      } 
    ])
  ],
  declarations: [HomePage, GenderComponent, ReligionComponent, FilterNamesComponent, 
                AddNameComponent,
                NameDetailsComponent,
                NameDetailsItemComponent,
                SignupComponent,
                LoginComponent,
                AddNameComponent,
                GoogleLoginComponent]
})
export class HomePageModule {}
