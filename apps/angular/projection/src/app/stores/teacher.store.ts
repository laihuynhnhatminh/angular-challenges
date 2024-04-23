import { Injectable, signal } from '@angular/core';
import { Teacher } from '../model/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore {
  private teachers = signal<Teacher[]>([]);

  public get teachers$() {
    return this.teachers;
  }

  public setAll(teachers: Teacher[]) {
    this.teachers.set(teachers);
  }

  public addOne(teacher: Teacher) {
    this.teachers.update((teachers) => teachers.concat(teacher));
  }

  public deleteOne(id: number) {
    this.teachers.update((teachers) => teachers.filter((t) => t.id !== id));
  }
}
