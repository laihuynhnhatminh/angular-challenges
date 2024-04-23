import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access';
import { randomCity } from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { DataCardComponentBase, DataStoreBase } from '../../shared';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  standalone: true,
  providers: [
    {
      provide: DataStoreBase,
      useExisting: CityStore,
    },
  ],
  imports: [CardComponent, ListItemComponent, AsyncPipe],
})
export class CityCardComponent
  extends DataCardComponentBase<City>
  implements OnInit
{
  public ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  public override onAddNewItem(): void {
    this.store.addOne(randomCity());
  }
}
