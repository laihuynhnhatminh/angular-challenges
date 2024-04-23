import { Injectable } from '@angular/core';
import { Student } from '../model/student.model';
import { DataStoreBase } from '../shared/data.store.base';

@Injectable({
  providedIn: 'root',
})
export class StudentStore extends DataStoreBase<Student> {}
