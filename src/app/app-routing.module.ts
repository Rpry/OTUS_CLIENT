import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoursesComponent } from './courses/courses.component';
import {CourseDetailComponent} from "./course-detail/course-detail.component";

const routes: Routes = [
  { path: '', component: CoursesComponent },
  { path: 'detail/:id', component: CourseDetailComponent },
  { path: 'courses', component: CoursesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
