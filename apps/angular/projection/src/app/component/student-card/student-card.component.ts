import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StudentStore } from '../../data-access';
import { randStudent } from '../../data-access/fake-http.service';
import { Student } from '../../model/student.model';
import { DataCardComponentBase, DataStoreBase } from '../../shared';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  standalone: true,
  providers: [
    {
      provide: DataStoreBase,
      useExisting: StudentStore,
    },
  ],
  imports: [CardComponent, ListItemComponent, AsyncPipe],
})
export class StudentCardComponent
  extends DataCardComponentBase<Student>
  implements OnInit
{
  public ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  public override onAddNewItem(): void {
    this.store.addOne(randStudent());
  }
}
