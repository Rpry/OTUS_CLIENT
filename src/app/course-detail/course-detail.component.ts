import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {CourseService} from "../services/course.service";
import {Course} from "../models/course";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: [ './course-detail.component.css' ]
})
export class CourseDetailComponent implements OnInit {
  course: Course | undefined;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getCourse();
  }

  getCourse(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.courseService.getCourse(id)
      .subscribe(course => this.course = course);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.course) {
      this.courseService.updateCourses(this.course)
        .subscribe(() => this.goBack());
    }
  }
}
