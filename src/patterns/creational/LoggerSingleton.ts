import { Logger } from '../../utils/Logger';

/**
 * The Logger itself is already a singleton in utils/Logger.ts.
 * This file demonstrates accessing that singleton.
 */
export const AppLogger = Logger.getInstance();
