// controllers/CommandController.ts
import { ClassroomService } from '../services/ClassroomService';
import { StudentService } from '../services/StudentService';
import { AssignmentService } from '../services/AssignmentService';
import { parseArgs } from '../utils/Validation';

export class CommandController {
    constructor(
        private classroomService: ClassroomService,
        private studentService: StudentService,
        private assignmentService: AssignmentService
    ) { }

    async handle(rawInput: string): Promise<boolean> {
        const tokens = parseArgs(rawInput);
        if (tokens.length === 0) return false;

        const cmd = tokens[0].toLowerCase();

        switch (cmd) {
            case 'add_classroom': {
                const name = tokens[1];
                if (!name) { console.log('Usage: add_classroom <className>'); break; }
                await this.classroomService.addClassroom(name);
                console.log(`Classroom ${name} has been created.`);
                break;
            }

            case 'list_classrooms': {
                const list = await this.classroomService.listClassrooms();
                console.log('Classrooms:', list.map(c => `${c.name} (${c.id})`).join('\n') || '[none]');
                break;
            }

            case 'remove_classroom': {
                const name = tokens[1];
                if (!name) { console.log('Usage: remove_classroom <className>'); break; }
                await this.classroomService.removeClassroom(name);
                console.log(`Classroom ${name} removed.`);
                break;
            }

            case 'add_student': {
                const studentId = tokens[1];
                const className = tokens[2];
                const studentName = tokens[3] || studentId;
                if (!studentId || !className) { console.log('Usage: add_student <studentId> <className> [studentName]'); break; }
                await this.studentService.enrollStudent(studentId, studentName, className);
                console.log(`Student ${studentId} has been enrolled in ${className}.`);
                break;
            }

            case 'list_students': {
                const className = tokens[1];
                if (!className) { console.log('Usage: list_students <className>'); break; }
                const students = await this.studentService.listStudentsInClass(className);
                console.log(`Students in ${className}:`, students.map(s => `${s.id} (${s.name})`).join('\n') || '[none]');
                break;
            }

            case 'schedule_assignment': {
                const className = tokens[1];
                const title = tokens[2];
                const description = tokens[3] || '';
                const due = tokens[4];
                if (!className || !title || !due) { console.log('Usage: schedule_assignment <className> "<title>" "<description>" <dueISO>'); break; }
                await this.assignmentService.scheduleAssignment(className, title, description, new Date(due));
                console.log(`Assignment for ${className} has been scheduled.`);
                break;
            }

            case 'list_assignments': {
                const className = tokens[1];
                if (!className) { console.log('Usage: list_assignments <className>'); break; }

                const assignments = await this.assignmentService.listAssignmentsForClass(className);

                console.log('Assignments:');
                for (const a of assignments) {
                    const due = new Date(a.dueDate);
                    const dueStr = isNaN(due.getTime()) ? 'invalid date' : due.toISOString();
                    console.log(`- ${a.id}: ${a.title} (due: ${dueStr})`);
                }
                break;
            }

            case 'submit_assignment': {
                const studentId = tokens[1];
                const className = tokens[2];
                const assignmentId = tokens[3];
                const text = tokens[4] || '';
                if (!studentId || !className || !assignmentId) { console.log('Usage: submit_assignment <studentId> <className> "<assignmentId>" "<submissionText>"'); break; }
                await this.assignmentService.submitAssignment(studentId, className, assignmentId, text);
                console.log(`Assignment submitted by Student ${studentId} in ${className}.`);
                break;
            }

            case 'help': {
                console.log([
                    'Commands:',
                    ' add_classroom <className>',
                    ' list_classrooms',
                    ' remove_classroom <className>',
                    ' add_student <studentId> <className> [studentName]',
                    ' list_students <className>',
                    ' schedule_assignment <className> "<title>" "<description>" <dueISO>',
                    ' list_assignments <className>',
                    ' submit_assignment <studentId> <className> "<assignmentId>" "<submissionText>"',
                    ' help',
                    ' exit'
                ].join('\n'));
                break;
            }

            case 'exit': {
                console.log('Exiting...');
                return true;
            }

            default:
                console.log(`Unknown command: ${cmd}. Type 'help' for commands.`);
        }

        return false;
    }
}
