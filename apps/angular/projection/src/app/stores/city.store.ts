import { Injectable, signal } from '@angular/core';
import { City } from '../model/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  private cities = signal<City[]>([]);

  public get cities$() {
    return this.cities;
  }

  public setAll(cities: City[]) {
    this.cities.set(cities);
  }

  public addOne(city: City) {
    this.cities.update((cities) => cities.concat(city));
  }

  public deleteOne(id: number) {
    this.cities.update((cities) => cities.filter((c) => c.id !== id));
  }
}
