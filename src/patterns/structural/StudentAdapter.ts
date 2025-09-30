// Suppose legacy system returns this shape:
export interface LegacyStudentRecord {
    uid: string;
    displayName: string;
    classes: string[];
}

// Adapter to our Student model
import Student from '../../models/Student';
export class StudentAdapter {
    static fromLegacy(rec: LegacyStudentRecord): Student {
        const s = new Student(rec.uid, rec.displayName);
        s.enrolledClasses = rec.classes || [];
        return s;
    }
}
