import { Injectable } from '@angular/core';
import { City } from '../model/city.model';
import { DataStoreBase } from '../shared/data.store.base';

@Injectable({
  providedIn: 'root',
})
export class CityStore extends DataStoreBase<City> {}
