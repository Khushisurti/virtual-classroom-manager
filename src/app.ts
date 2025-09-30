import { CommandController } from './controllers/CommandController';
import { Logger } from './utils/Logger';
import { FileRepository } from './repositories/FileRepository';
import { ClassroomService } from './services/ClassroomService';
import { StudentService } from './services/StudentService';
import { AssignmentService } from './services/AssignmentService';
import CLI from './cli';

// Import your models so we can pass them as generic types
import Classroom from './models/Classroom';
import Student from './models/Student';
import Assignment from './models/Assignment';

export default class App {
    private controller: CommandController;

    constructor() {
        Logger.getInstance().info('Initializing application');

        // instantiate repositories (with correct type parameters!)
        const classroomRepo = new FileRepository<Classroom>('data/classrooms.json');
        const studentRepo = new FileRepository<Student>('data/students.json');
        const assignmentRepo = new FileRepository<Assignment>('data/assignments.json');

        // services
        const classroomService = new ClassroomService(classroomRepo);
        const studentService = new StudentService(studentRepo, classroomRepo);
        const assignmentService = new AssignmentService(assignmentRepo, classroomRepo, studentRepo);

        this.controller = new CommandController(classroomService, studentService, assignmentService);
    }

    public async start() {
        Logger.getInstance().info('Starting CLI');
        const cli = new CLI(this.controller);
        await cli.run();
        Logger.getInstance().info('CLI stopped');
    }
}
