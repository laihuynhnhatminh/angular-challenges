import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  WritableSignal,
} from '@angular/core';
import { Teacher } from '../../model/teacher.model';
import { FakeHttpService, randTeacher } from '../../services/fake-http.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { ListItemRefDirective } from '../../shared/components/list-item/list-item-ref.directive';
import { ListItemComponent } from '../../shared/components/list-item/list-item.component';
import { TeacherStore } from '../../stores/teacher.store';

@Component({
  selector: 'app-teacher-card',
  template: `
    <
    <app-card [list]="teachers()" (addNewItem)="addTeacher()">
      <img src="assets/img/teacher.png" alt="teacher" width="200px" />

      <ng-template listItemRef let-item>
        <app-list-item (deleteItem)="deleteTeacher(item.id)">
          {{ item.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      app-card {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent, ListItemRefDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherCardComponent implements OnInit {
  public teachers: WritableSignal<Teacher[]> = this.store.teachers$;

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  public ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.setAll(t));
  }

  public addTeacher(): void {
    this.store.addOne(randTeacher());
  }

  public deleteTeacher(id: number): void {
    this.store.deleteOne(id);
  }
}
