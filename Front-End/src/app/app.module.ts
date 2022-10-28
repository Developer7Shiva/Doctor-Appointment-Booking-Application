import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  HashLocationStrategy,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from './containers';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
  ModalModule,
} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import { DoctorsComponent } from './views/doctors/doctors.component';
import { PatientsComponent } from './views/patients/patients.component';
import { AdminsComponent } from './views/admins/admins.component';
import { PagesModule } from './views/pages/pages.module';
import { ViewAdminComponent } from './views/admins/view-admin/view-admin.component';
import { EditAdminComponent } from './views/admins/edit-admin/edit-admin.component';
import { CreateAdminComponent } from './views/admins/create-admin/create-admin.component';
import { ViewProfileComponent } from './views/doctors/view-profile/view-profile.component';
import { EditDoctorComponent } from './views/doctors/edit-doctor/edit-doctor.component';
import { CreateDoctorComponent } from './views/doctors/create-doctor/create-doctor.component';
import { EditPatientComponent } from './views/patients/edit-patient/edit-patient.component';
import { AppointmentComponent } from './views/patients/appointment/appointment.component';
import { PatientprofileComponent } from './views/patients/patientprofile/patientprofile.component';
import { HomeComponent } from './views/patients/home/home.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];

@NgModule({
  declarations: [
    AppComponent,
    DoctorsComponent,
    PatientsComponent,
    AdminsComponent,
    ViewAdminComponent,
    EditAdminComponent,
    CreateAdminComponent,
    ...APP_CONTAINERS,
    ViewProfileComponent,
    EditDoctorComponent,
    CreateDoctorComponent,
    EditPatientComponent,
    AppointmentComponent,
    PatientprofileComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    PerfectScrollbarModule,
    NavModule,
    ButtonModule,
    FormModule,
    FormsModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    PagesModule,
    HttpClientModule,
    ModalModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    IconSetService,
    Title,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
