import { Injectable } from '@angular/core';
import { Teacher } from '../model/teacher.model';
import { DataStoreBase } from '../shared/data.store.base';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore extends DataStoreBase<Teacher> {}
