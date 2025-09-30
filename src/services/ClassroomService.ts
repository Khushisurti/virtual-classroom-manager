import Classroom from '../models/Classroom';
import { IRepository } from '../repositories/BaseRepository';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from '../utils/Logger';

export class ClassroomService {
    constructor(private repo: IRepository<Classroom>) { }

    async addClassroom(name: string): Promise<Classroom> {
        // validate simple rules
        if (!name || !name.trim()) throw new Error('Invalid classroom name');
        // check duplicate
        const exists = await this.repo.find(c => (c as any).name?.toLowerCase?.() === name.toLowerCase());
        if (exists) throw new Error('Classroom already exists');
        const c = new Classroom(uuidv4(), name);
        await this.repo.add(c);
        Logger.getInstance().info(`Classroom ${name} added`);
        return c;
    }

    async listClassrooms(): Promise<Classroom[]> {
        return this.repo.getAll();
    }

    async removeClassroom(name: string): Promise<void> {
        await this.repo.remove(c => (c as any).name === name);
        Logger.getInstance().info(`Classroom ${name} removed`);
    }

    async addStudentToClass(className: string, studentId: string): Promise<void> {
        const room = await this.repo.find(c => (c as any).name === className);
        if (!room) throw new Error('Classroom not found');
        const idxRoom = { ...(room as any) };
        if (!(idxRoom.students as string[]).includes(studentId)) {
            idxRoom.students.push(studentId);
            await this.repo.update(c => (c as any).id === (room as any).id, idxRoom);
        }
    }
}
