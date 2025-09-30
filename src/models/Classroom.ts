export type UUID = string;

export interface AssignmentSummary {
    id: string;
    title: string;
    dueDate: string; // ISO
}

export default class Classroom {
    public id: UUID;
    public name: string;
    public students: string[]; // student IDs
    public assignments: AssignmentSummary[];
    public createdAt: string;

    constructor(id: UUID, name: string) {
        this.id = id;
        this.name = name;
        this.students = [];
        this.assignments = [];
        this.createdAt = new Date().toISOString();
    }
}
