// src/services/AssignmentService.ts
import Assignment, { Submission } from '../models/Assignment';
import { IRepository } from '../repositories/BaseRepository';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from '../utils/Logger';
import { GradingStrategy, PointsGrading } from '../patterns/behavioral/GradingStrategy';

export class AssignmentService {
    private gradingStrategy: GradingStrategy;

    constructor(
        private repo: IRepository<Assignment>,
        private classroomRepo: IRepository<any>,
        private studentRepo: IRepository<any>
    ) {
        // Default grading strategy
        this.gradingStrategy = new PointsGrading();
    }

    // Optional: allow switching grading strategy dynamically
    setGradingStrategy(strategy: GradingStrategy) {
        this.gradingStrategy = strategy;
    }

    async scheduleAssignment(className: string, title: string, description: string, due: Date): Promise<Assignment> {
        const classroom = await this.classroomRepo.find((c: any) => c.name === className);
        if (!classroom) throw new Error('Classroom not found');

        const id = uuidv4();
        const assignment = new Assignment(id, className, title, description, due.toISOString());
        await this.repo.add(assignment);

        const classroomCopy = { ...classroom };
        classroomCopy.assignments = classroomCopy.assignments || [];
        classroomCopy.assignments.push({ id, title, dueDate: due.toISOString() });
        await this.classroomRepo.update((c: any) => c.name === className, classroomCopy);

        Logger.getInstance().info(`Assignment scheduled: ${title} for ${className}`);
        return assignment;
    }

    async listAssignmentsForClass(className: string): Promise<Assignment[]> {
        const all = await this.repo.getAll();
        return all
            .filter(a => a.className === className)
            .map(a => ({ ...a, dueDate: new Date(a.dueDate) })) as any;
    }
    async viewSubmissions(className: string, assignmentId: string) {
        const assignment = await this.repo.find(a => a.id === assignmentId && a.className === className);
        if (!assignment) throw new Error('Assignment not found');
        return assignment.submissions || [];
    }

    async getStudentGrades(studentId: string, className: string) {
        const assignments = await this.repo.getAll();
        const relevant = assignments.filter(a => a.className === className);

        const results: { title: string, score: number, grade: string, pass: boolean }[] = [];

        for (const a of relevant) {
            const sub = (a.submissions || []).find(s => s.studentId === studentId);
            if (sub) {
                // Demo scoring logic (recalculate each time for simplicity)
                const score = Math.floor(Math.random() * 101);
                const grade = this.gradingStrategy.calculateGrade(score);
                const pass = score >= 50;
                results.push({ title: a.title, score, grade, pass });
            }
        }
        return results;
    }


    async submitAssignment(
        studentId: string,
        className: string,
        assignmentId: string,
        text: string
    ): Promise<{ score: number, grade: string, pass: boolean }> {
        const assignment = await this.repo.find(a => a.id === assignmentId);
        if (!assignment) throw new Error('Assignment not found');

        const student = await this.studentRepo.find((s: any) => s.id === studentId);
        if (!student) throw new Error('Student not found');
        if (!student.enrolledClasses.includes(className)) throw new Error('Student is not enrolled in the class');

        const submission: Submission = {
            studentId,
            submittedAt: new Date().toISOString(),
            text
        };
        assignment.submissions.push(submission);
        await this.repo.update(a => a.id === assignmentId, assignment);

        Logger.getInstance().info(`Submission recorded for assignment ${assignmentId} by ${studentId}`);

        // Demo scoring logic
        const score = Math.floor(Math.random() * 101);
        const grade = this.gradingStrategy.calculateGrade(score);
        const pass = score >= 50; // pass/fail threshold

        return { score, grade, pass };
    }
}
