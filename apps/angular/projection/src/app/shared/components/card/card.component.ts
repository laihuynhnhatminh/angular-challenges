import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  contentChild,
  input,
  output,
} from '@angular/core';
import { ListItemRefDirective } from '../list-item/list-item-ref.directive';

interface BaseCardData {
  id: number;
}

@Component({
  selector: 'app-card',
  template: `
    <ng-content></ng-content>

    <section>
      @for (item of list(); track $index) {
        <ng-template
          [ngTemplateOutlet]="listItemTemplate()"
          [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
      }
    </section>

    <button
      class="rounded-sm border border-blue-500 bg-blue-300 p-2"
      (click)="addNewItem.emit()">
      Add
    </button>
  `,
  standalone: true,
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent<T extends BaseCardData> {
  public list = input<T[]>();
  public addNewItem = output<void>();
  public listItemTemplate = contentChild.required(ListItemRefDirective, {
    read: TemplateRef,
  });
}
