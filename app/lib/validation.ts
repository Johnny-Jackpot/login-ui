import {z} from 'zod';

export const email = z.string().email({message: 'Please provide a valid email'});
export const password = z.string().min(8, {message: 'Password must be 8 or more characters long'});
