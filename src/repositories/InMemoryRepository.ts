import { IRepository } from './BaseRepository';

export class InMemoryRepository<T> implements IRepository<T> {
    private items: T[] = [];

    constructor(initial: T[] = []) {
        this.items = initial;
    }

    async getAll(): Promise<T[]> {
        // return deep copy to avoid outside mutation
        return JSON.parse(JSON.stringify(this.items));
    }

    async find(predicate: (t: T) => boolean): Promise<T | null> {
        const found = this.items.find(predicate);
        return found ? JSON.parse(JSON.stringify(found)) : null;
    }

    async add(item: T): Promise<void> {
        this.items.push(item);
    }

    async update(predicate: (t: T) => boolean, item: T): Promise<void> {
        const idx = this.items.findIndex(predicate);
        if (idx === -1) throw new Error('Item not found');
        this.items[idx] = item;
    }

    async remove(predicate: (t: T) => boolean): Promise<void> {
        this.items = this.items.filter(i => !predicate(i));
    }
}
