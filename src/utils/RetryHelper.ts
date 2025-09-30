export class RetryHelper {
    static async retry<T>(fn: () => Promise<T>, attempts = 3, delayMs = 200): Promise<T> {
        let lastError: any;
        for (let i = 0; i < attempts; i++) {
            try {
                return await fn();
            } catch (err) {
                lastError = err;
                // simple exponential backoff
                await new Promise(res => setTimeout(res, delayMs * (i + 1)));
            }
        }
        throw lastError;
    }
}
