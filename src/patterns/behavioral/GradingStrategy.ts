
export interface GradingStrategy {
    calculateGrade(score: number): string;
}
export class PointsGrading implements GradingStrategy {
    calculateGrade(score: number): string {
        return `${score}/100`;
    }
}
export class LetterGrading implements GradingStrategy {
    calculateGrade(score: number): string {
        if (score >= 90) return "A";
        if (score >= 80) return "B";
        if (score >= 70) return "C";
        if (score >= 60) return "D";
        return "F";
    }
}
