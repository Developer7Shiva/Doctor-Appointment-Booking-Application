import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsComponent } from '../admins/admins.component';
import { CreateAdminComponent } from '../admins/create-admin/create-admin.component';
import { EditAdminComponent } from '../admins/edit-admin/edit-admin.component';
import { ViewAdminComponent } from '../admins/view-admin/view-admin.component';
import { DoctorsComponent } from '../doctors/doctors.component';
import { PatientsComponent } from '../patients/patients.component';
import { DashboardComponent } from './dashboard.component';

import { EditDoctorComponent } from '../doctors/edit-doctor/edit-doctor.component';
import { CreateDoctorComponent } from '../doctors/create-doctor/create-doctor.component';
import { EditPatientComponent } from '../patients/edit-patient/edit-patient.component';
import { PatientprofileComponent } from '../patients/patientprofile/patientprofile.component';
import { HomeComponent } from '../patients/home/home.component';
import { AppointmentComponent } from '../patients/appointment/appointment.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: $localize`Dashboard`,
    },
  },
  {
    path: 'patients',
    data: {
      title: $localize`Patient`
    },
    children: [
      {
        path: '',
        component: HomeComponent,
        data: {
          title: $localize`D-Booking`
        }
      },
      {
        path: 'home',
        component: HomeComponent,
        data: {
          title: $localize`D-Booking`
        }
      },
      {
        path: 'appointments',
        component: AppointmentComponent,
        data:{
          title: $localize`Appointments`
        }
      },
      {
        path: 'profile',
        component: PatientprofileComponent,
        data: {
          title: $localize`Profile`
        }
      },
      {
        path:'view_doctors',
        component: HomeComponent,
        data: {
          title: $localize`New Booking`
        }
      }
    ]
  },
  {
    path: 'view_doctors',
    data: {
      title: $localize`Doctors`,
    },
    children: [
      {
        path: '',
        component: DoctorsComponent,
        data: {
          title: $localize`View Doctors`,
        },
      },
      {
        path: 'reg_doctor',
        component: CreateDoctorComponent,
        data: {
          title: $localize`Register Doctor`,
        },
      },
      {
        path: 'update_doctor/:id',
        component: EditDoctorComponent,
        data: {
          title: $localize`Update Doctor`,
        },
      },
    ],
  },
  {
    path: 'view_patients',
    children: [
      {
        path: '',
        component: PatientsComponent,
        data: {
          title: $localize`View patients`,
        },
      },
      {
        path: 'profile',
        component: PatientprofileComponent,
        data: {
          title: $localize`Patient Profile`,
        },
      },
      {
        path: 'update_patient/:id',
        component: EditPatientComponent,
        data: {
          title: $localize`Edit Patient`,
        },
      },
      {
        path: 'appointments',
        component: AppointmentComponent,
        data: {
          title: $localize`Appointments List`
        }
      }
    ],
  },
  {
    path: 'view_admins',
    data: {
      title: $localize`Admins`,
    },
    children: [
      {
        path: '',
        component: AdminsComponent,
      },
      {
        path: 'profile',
        component: ViewAdminComponent,
        data: {
          title: $localize`Profile`,
        },
      },
      {
        path: 'update_admin/:id',
        component: EditAdminComponent,
        data: {
          title: $localize`Edit Admin`,
        },
      },
      {
        path: 'reg_admin',
        component: CreateAdminComponent,
        data: {
          title: $localize`Admin Register`,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
