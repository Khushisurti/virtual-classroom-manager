export default class Student {
    public id: string;
    public name: string;
    public enrolledClasses: string[]; // classroom names or IDs

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.enrolledClasses = [];
    }
}
