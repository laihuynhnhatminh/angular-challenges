import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  WritableSignal,
} from '@angular/core';
import { Student } from '../../model/student.model';
import { FakeHttpService, randStudent } from '../../services/fake-http.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { ListItemRefDirective } from '../../shared/components/list-item/list-item-ref.directive';
import { ListItemComponent } from '../../shared/components/list-item/list-item.component';
import { StudentStore } from '../../stores/student.store';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card [list]="students()" (addNewItem)="addStudent()">
      <img src="assets/img/student.webp" alt="student" width="200px" />

      <ng-template listItemRef let-item>
        <app-list-item (deleteItem)="deleteStudent(item.id)">
          {{ item.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      app-card {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, ListItemRefDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  public students: WritableSignal<Student[]> = this.store.students$;

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  public ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.setAll(s));
  }

  public addStudent(): void {
    this.store.addOne(randStudent());
  }

  public deleteStudent(id: number): void {
    this.store.deleteOne(id);
  }
}
