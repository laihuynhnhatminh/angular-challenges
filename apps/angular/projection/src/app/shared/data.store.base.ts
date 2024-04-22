import { signal } from '@angular/core';

export interface DataBase {
  id: number;
}

export abstract class DataStoreBase<T extends DataBase> {
  private data = signal<T[]>([]);

  public get $data() {
    return this.data;
  }

  public addAll(data: T[]) {
    this.data.set(data);
  }

  public addOne(data: T) {
    this.data.update((prev) => [...prev, data]);
  }

  public deleteOne(id: number) {
    this.data.update((prev) => prev.filter((d) => d.id !== id));
  }
}
