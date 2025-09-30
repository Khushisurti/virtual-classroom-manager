import { ClassroomService } from '../../services/ClassroomService';
import { StudentService } from '../../services/StudentService';
import { AssignmentService } from '../../services/AssignmentService';

/**
 * Simplified API for a client that doesn't want to call three services separately.
 */
export class ClassroomFacade {
    constructor(
        private classroomService: ClassroomService,
        private studentService: StudentService,
        private assignmentService: AssignmentService
    ) { }

    async provisionClassWithStudents(className: string, students: { id: string, name?: string }[]) {
        await this.classroomService.addClassroom(className);
        for (const s of students) {
            await this.studentService.enrollStudent(s.id, s.name || s.id, className);
        }
    }
}
