import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  WritableSignal,
} from '@angular/core';
import { City } from '../../model/city.model';
import { FakeHttpService, randomCity } from '../../services/fake-http.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { ListItemRefDirective } from '../../shared/components/list-item/list-item-ref.directive';
import { ListItemComponent } from '../../shared/components/list-item/list-item.component';
import { CityStore } from '../../stores/city.store';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [list]="cities()" (addNewItem)="addCity()">
      <img src="assets/img/city.png" alt="city" width="200px" />
      <ng-template listItemRef let-item>
        <app-list-item (deleteItem)="deleteCity(item.id)">
          {{ item.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      app-card {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent, ListItemRefDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  public cities: WritableSignal<City[]> = this.store.cities$;

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  public ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.setAll(c));
  }

  public addCity(): void {
    this.store.addOne(randomCity());
  }

  public deleteCity(id: number): void {
    this.store.deleteOne(id);
  }
}
