import * as crypto from 'crypto';
import { config } from '../config';

export function removePrefix(url: string): string {
    const position = url.indexOf(config.apiPathPrefix);
    if (position >= 0) {
        return url.substring(config.apiPathPrefix.length);
    }
    return url;
}

export function hash(str: string): string {
    const hash = crypto.createHash('sha512');
    return hash.update(str).digest('hex');
}

export function generateRandomString(len: number): string {
    let text: string = '';
    const possible: string = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < len; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
