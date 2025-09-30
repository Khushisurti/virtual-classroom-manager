import winston from 'winston';
import fs from 'fs';

const logDir = 'logs';
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

export class Logger {
    private static instance: winston.Logger | null = null;

    static getInstance(): winston.Logger {
        if (!Logger.instance) {
            Logger.instance = winston.createLogger({
                level: 'info',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level}] ${message}`)
                ),
                transports: [
                    new winston.transports.Console(),
                    new winston.transports.File({ filename: `${logDir}/combined.log` })
                ]
            });
        }
        return Logger.instance;
    }
}
