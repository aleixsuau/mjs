import { Injectable } from '@angular/core';

@Injectable()
export class TestingService {
  private _items: string[] = [];

  constructor() { }

  public getItems(): string[] {
    return this._items;
  }

  public addItem(item: string) {
    this._items.push(item);
  }

  public deleteItem(index: number) {
    if (index < this.getSize()) {
      this._items.splice(index, 1);
    }
  }

  public getSize(): number {
    return this._items.length;
  }
}
