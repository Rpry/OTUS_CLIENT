import { Component, OnInit } from '@angular/core';

import {CourseService} from "../services/course.service";
import {Course} from "../models/course";

@Component({
  selector: 'app-heroes',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.courseService.getCourses(1, 100)
      .subscribe(courses => this.courses = courses);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.courseService.addCourse({ name } as Course)
      .subscribe(id => {
        this.courseService.getCourse(id).subscribe(course =>
          this.courses.push(course)
        );
      });
  }

  delete(hero: Course): void {
    this.courses = this.courses.filter(h => h !== hero);
    this.courseService.deleteCourse(hero.id).subscribe();
  }
}
