import Classroom from '../../models/Classroom';
import { v4 as uuidv4 } from 'uuid';

export abstract class ClassroomBase extends Classroom {
    abstract getType(): string;
}

export class StandardClassroom extends ClassroomBase {
    getType() { return 'Standard'; }
}

export class LabClassroom extends ClassroomBase {
    getType() { return 'Lab'; }
}

export class ClassroomFactory {
    static create(type: 'standard' | 'lab', name: string): ClassroomBase {
        if (type === 'lab') return new LabClassroom(uuidv4(), name);
        return new StandardClassroom(uuidv4(), name);
    }
}
