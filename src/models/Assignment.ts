export interface Submission {
    studentId: string;
    submittedAt: string;
    text: string;
}

export default class Assignment {
    public id: string;
    public className: string;
    public title: string;
    public description: string;
    public dueDate: string;
    public submissions: Submission[];

    constructor(id: string, className: string, title: string, description: string, due: string) {
        this.id = id;
        this.className = className;
        this.title = title;
        this.description = description;
        this.dueDate = due;
        this.submissions = [];
    }
}
