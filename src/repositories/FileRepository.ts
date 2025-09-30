import fs from 'fs/promises';
import path from 'path';
import { IRepository } from './BaseRepository';
import { RetryHelper } from '../utils/RetryHelper';
import { Logger } from '../utils/Logger';

export class FileRepository<T> implements IRepository<T> {
    private file: string;

    constructor(filePath: string) {
        this.file = path.resolve(filePath);
        // Ensure file exists
        this.ensureFile().catch(err => {
            Logger.getInstance().error('Error ensuring repo file: ' + err);
        });
    }

    private async ensureFile() {
        try {
            await fs.mkdir(path.dirname(this.file), { recursive: true });
            try {
                await fs.stat(this.file);
            } catch {
                await fs.writeFile(this.file, '[]', 'utf-8');
            }
        } catch (err) {
            throw err;
        }
    }

    private async read(): Promise<T[]> {
        const text = await fs.readFile(this.file, 'utf-8');
        return JSON.parse(text || '[]');
    }

    private async write(data: T[]): Promise<void> {
        // small wrapper with retry for transient file errors
        await RetryHelper.retry(async () => {
            await fs.writeFile(this.file, JSON.stringify(data, null, 2), 'utf-8');
        }, 3, 200);
    }

    async getAll(): Promise<T[]> {
        return this.read();
    }

    async find(predicate: (t: T) => boolean): Promise<T | null> {
        const items = await this.read();
        const found = items.find(predicate);
        return found || null;
    }

    async add(item: T): Promise<void> {
        const items = await this.read();
        items.push(item);
        await this.write(items);
    }

    async update(predicate: (t: T) => boolean, item: T): Promise<void> {
        const items = await this.read();
        const idx = items.findIndex(predicate as any);
        if (idx === -1) throw new Error('Item not found for update');
        items[idx] = item;
        await this.write(items);
    }

    async remove(predicate: (t: T) => boolean): Promise<void> {
        const items = await this.read();
        const filtered = items.filter(i => !(predicate as any)(i));
        await this.write(filtered);
    }
}
