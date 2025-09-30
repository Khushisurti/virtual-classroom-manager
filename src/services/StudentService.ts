import Student from '../models/Student';
import { IRepository } from '../repositories/BaseRepository';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from '../utils/Logger';

export class StudentService {
    constructor(private repo: IRepository<Student>, private classroomRepo: IRepository<any>) { }

    async enrollStudent(studentId: string, name: string, className: string): Promise<Student> {
        // ensure classroom exists
        const classroom = await this.classroomRepo.find((c: any) => c.name === className);
        if (!classroom) throw new Error('Classroom not found');

        // check if student exists
        let student = await this.repo.find(s => (s as any).id === studentId);
        if (!student) {
            student = new Student(studentId, name || studentId);
            await this.repo.add(student);
            Logger.getInstance().info(`Student ${studentId} created`);
        }
        // update student enrolledClasses
        const s = { ...(student as any) };
        if (!s.enrolledClasses.includes(className)) {
            s.enrolledClasses.push(className);
            await this.repo.update((x: any) => x.id === studentId, s);
        }
        // add student to classroom
        await this.classroomRepo.update((c: any) => c.name === className, {
            ...(classroom as any),
            students: Array.from(new Set([...(classroom as any).students || [], studentId]))
        });
        Logger.getInstance().info(`Student ${studentId} enrolled in ${className}`);
        return s;
    }

    async listStudentsInClass(className: string): Promise<Student[]> {
        const classroom = await this.classroomRepo.find((c: any) => c.name === className);
        if (!classroom) throw new Error('Classroom not found');
        const ids: string[] = classroom.students || [];
        const all = await this.repo.getAll();
        return all.filter(a => ids.includes((a as any).id));
    }
}
