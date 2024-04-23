import { Injectable, signal } from '@angular/core';
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentStore {
  private students = signal<Student[]>([]);

  public get students$() {
    return this.students;
  }

  public setAll(students: Student[]) {
    this.students.set(students);
  }

  public addOne(student: Student) {
    this.students.update((students) => students.concat(student));
  }

  public deleteOne(id: number) {
    this.students.update((students) => students.filter((s) => s.id !== id));
  }
}
