export interface IRepository<T> {
    getAll(): Promise<T[]>;
    find(predicate: (t: T) => boolean): Promise<T | null>;
    add(item: T): Promise<void>;
    update(predicate: (t: T) => boolean, item: T): Promise<void>;
    remove(predicate: (t: T) => boolean): Promise<void>;
}
