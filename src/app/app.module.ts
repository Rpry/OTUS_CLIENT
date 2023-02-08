import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { httpInterceptorProviders } from './interceptors';

import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseDetailComponent
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
