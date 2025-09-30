/**
 * parseArgs handles quoted strings, e.g.
 * schedule_assignment MyClass "Title here" "desc" 2025-09-30T18:30:00Z
 */
export function parseArgs(input: string): string[] {
    const tokens: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < input.length; i++) {
        const ch = input[i];
        if (ch === '"') {
            inQuotes = !inQuotes;
            continue;
        }
        if (!inQuotes && /\s/.test(ch)) {
            if (current !== '') {
                tokens.push(current);
                current = '';
            }
            continue;
        }
        current += ch;
    }
    if (current !== '') tokens.push(current);
    return tokens;
}
