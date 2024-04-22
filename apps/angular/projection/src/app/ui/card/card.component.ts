import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  contentChild,
  input,
  output,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  host: {
    class: 'flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4',
  },
  standalone: true,
  imports: [ListItemComponent, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  list = input<any[]>([]);
  listItemTmpl = contentChild.required('cardRow', { read: TemplateRef });

  protected addNewItem = output<void>();
}
