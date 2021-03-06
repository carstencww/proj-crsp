// Name: Lai Chun Hin     SID: 1155064573
// Name: Chan Wang Wai    SID: 1155063885
// Name: Fong Kee Win     SID: 1155100567

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent} from './login/login.component';
import { AuthGuard, AdminGuard, LoginGuard } from './_guards';
import { EventslistComponent } from './eventslist/eventslist.component';
import { AdminComponent } from './admin/admin.component';
import { EventdetailComponent } from './eventdetail/eventdetail.component';
import { MyfaveventsComponent } from './myfavevents/myfavevents.component';
import { ExtractComponent } from './extract/extract.component';
import { UploadcsvComponent } from './uploadcsv/uploadcsv.component';
import { ChangeeventComponent } from './changeevent/changeevent.component';
import { ChangeuserComponent } from './changeuser/changeuser.component';


const routes: Routes = [
  { path: '', redirectTo: '/home' , pathMatch: 'full'  },
  { path: 'home', component : HomeComponent, canActivate: [AuthGuard],
    children: [
      {
       path: 'eventslist',
       component: EventslistComponent
      },
      {
       path: 'event/:id',
       component: EventdetailComponent
      },
      {
        path: 'myfavevents',
        component: MyfaveventsComponent
      }
  ]},
  { path: 'about', component: AboutComponent},
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard],
    children: [
      {path: 'changeuser', component: ChangeuserComponent },
      {path: 'changeevent', component: ChangeeventComponent },
      {path: 'uploadcsv', component: UploadcsvComponent },
      {path: 'flush', component: ExtractComponent}
  ]},
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
