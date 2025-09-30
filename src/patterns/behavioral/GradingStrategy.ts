export interface GradingStrategy {
    grade(submissionText: string): { score: number; pass: boolean };
}

export class PassFailStrategy implements GradingStrategy {
    grade(submissionText: string) {
        const pass = submissionText.trim().length > 10;
        return { score: pass ? 100 : 0, pass };
    }
}

export class WordCountStrategy implements GradingStrategy {
    grade(submissionText: string) {
        const wc = submissionText.trim().split(/\s+/).filter(Boolean).length;
        const score = Math.min(100, wc * 2);
        return { score, pass: score >= 50 };
    }
}
