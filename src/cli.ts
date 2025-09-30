import readline from 'readline';
import { CommandController } from './controllers/CommandController';
import { Logger } from './utils/Logger';

export default class CLI {
    private rl: readline.Interface;
    private controller: CommandController;

    constructor(controller: CommandController) {
        this.controller = controller;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: '> '
        });

        // Graceful shutdown
        process.on('SIGINT', () => {
            Logger.getInstance().info('SIGINT received, closing CLI');
            this.stop();
        });
    }

    async run(): Promise<void> {
        console.log('Virtual Classroom Manager — type "help" for commands.');
        this.rl.prompt();

        for await (const line of this.rl) {
            const input = (line || '').trim();
            if (!input) {
                this.rl.prompt();
                continue;
            }

            try {
                const shouldExit = await this.controller.handle(input);
                if (shouldExit) {
                    this.stop();
                    break;
                }
            } catch (err) {
                console.error('Error handling command:', (err as Error).message);
                Logger.getInstance().error(`Error handling command: ${(err as Error).stack || err}`);
            } finally {
                this.rl.prompt();
            }
        }
    }

    stop() {
        this.rl.close();
        process.exit(0);
    }
}
