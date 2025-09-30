type Callback = (msg: string) => void;

export class Observable {
    private observers: Map<string, Callback> = new Map();

    subscribe(id: string, cb: Callback) {
        this.observers.set(id, cb);
    }

    unsubscribe(id: string) {
        this.observers.delete(id);
    }

    notifyAll(msg: string) {
        for (const cb of this.observers.values()) {
            try { cb(msg); } catch (e) { /* swallow per observer */ }
        }
    }
}

// Example usage: when assignment is scheduled, notify observable
