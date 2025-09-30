// services/AssignmentService.ts
import Assignment, { Submission } from '../models/Assignment';
import { IRepository } from '../repositories/BaseRepository';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from '../utils/Logger';

export class AssignmentService {
    constructor(
        private repo: IRepository<Assignment>,
        private classroomRepo: IRepository<any>,
        private studentRepo: IRepository<any>
    ) { }

    async scheduleAssignment(className: string, title: string, description: string, due: Date): Promise<Assignment> {
        const classroom = await this.classroomRepo.find((c: any) => c.name === className);
        if (!classroom) throw new Error('Classroom not found');

        const id = uuidv4();
        const assignment = new Assignment(id, className, title, description, due.toISOString());
        await this.repo.add(assignment);

        // Add assignment summary to classroom
        const classroomCopy = { ...(classroom as any) };
        classroomCopy.assignments = classroomCopy.assignments || [];
        classroomCopy.assignments.push({ id, title, dueDate: due.toISOString() });
        await this.classroomRepo.update((c: any) => c.name === className, classroomCopy);

        Logger.getInstance().info(`Assignment scheduled: ${title} for ${className}`);
        return assignment;
    }

    async listAssignmentsForClass(className: string): Promise<Assignment[]> {
        const all = await this.repo.getAll();
        return all.filter(a => a.className === className);
    }

    async submitAssignment(studentId: string, className: string, assignmentId: string, text: string): Promise<void> {
        const assignment = await this.repo.find(a => a.id === assignmentId);
        if (!assignment) throw new Error('Assignment not found');

        const student = await this.studentRepo.find((s: any) => s.id === studentId);
        if (!student) throw new Error('Student not found');
        if (!student.enrolledClasses.includes(className)) throw new Error('Student is not enrolled in the class');

        const submission: Submission = { studentId, submittedAt: new Date().toISOString(), text };
        assignment.submissions.push(submission);
        await this.repo.update(a => a.id === assignmentId, assignment);

        Logger.getInstance().info(`Submission recorded for assignment ${assignmentId} by ${studentId}`);
    }
}
