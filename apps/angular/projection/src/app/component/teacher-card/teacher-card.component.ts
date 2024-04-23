import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TeacherStore, randTeacher } from '../../data-access';
import { Teacher } from '../../model/teacher.model';
import { DataCardComponentBase, DataStoreBase } from '../../shared';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  templateUrl: './teacher-card.component.html',
  standalone: true,
  providers: [
    {
      provide: DataStoreBase,
      useExisting: TeacherStore,
    },
  ],
  imports: [CardComponent, ListItemComponent, AsyncPipe],
})
export class TeacherCardComponent
  extends DataCardComponentBase<Teacher>
  implements OnInit
{
  public ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  public override onAddNewItem(): void {
    this.store.addOne(randTeacher());
  }
}
