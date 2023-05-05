import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import {Course} from "../models/course";
import {CourseFilter} from "../models/courseFilter";


@Injectable({ providedIn: 'root' })
export class CourseService {

  private courseUrl = 'course';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' as const,
      'accept': '*/*' as const
    })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET courses from the server */
  getCourses(page: number, itemsPerPage: number): Observable<Course[]> {
      let body = { page: page, itemsPerPage: itemsPerPage } as CourseFilter;
      return this.http.post<Course[]>(`${this.courseUrl}/list`, body,  this.httpOptions)
      .pipe(
        tap(_ => this.log('fetched courses')),
        catchError(this.handleError<Course[]>(`getCourses page=${page},itemsPerPage=${itemsPerPage}`, []))
      );
  }

  /** GET course by id. Will 404 if id not found */
  getCourse(id: number): Observable<Course> {
    const url = `${this.courseUrl}/${id}`;
    return this.http.get<Course>(url).pipe(
      tap(_ => this.log(`fetched Course id=${id}`)),
      catchError(this.handleError<Course>(`getCourse id=${id}`))
    );
  }

  /** POST: add a new course to the server */
  addCourse(course: Course): Observable<number> {
    return this.http.post<number>(this.courseUrl, course, this.httpOptions).pipe(
      tap((number: number) => this.log(`added course id=${number}`)),
      catchError(this.handleError<number>('addCourse'))
    );
  }

  /** DELETE: delete the course from the server */
  deleteCourse(id: number): Observable<Course> {
    const url = `${this.courseUrl}/${id}`;
    return this.http.delete<Course>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted Course id=${id}`)),
      catchError(this.handleError<Course>('deleteCourse'))
    );
  }

  /** PUT: update the courses on the server */
  updateCourses(course: Course): Observable<any> {
    return this.http.put(`${this.courseUrl}/${course.id}`, course, this.httpOptions).pipe(
      tap(_ => this.log(`updated course id=${course.id}`)),
      catchError(this.handleError<any>('updateCourse'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a CoursesService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`CourseService: ${message}`);
  }
}
