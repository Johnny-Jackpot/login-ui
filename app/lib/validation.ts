import {z} from 'zod';

export const email = z.string().email({message: 'Please provide a valid email'});
export const password = z.string().min(8, {
  message: 'Password must be 8 or more characters long'
});
export const confirmPassword = z.string().min(8, {
  message: 'Confirm password must be 8 or more characters long'
});

export const LoginFormSchema = z.object({email, password});
export const ForgotPasswordSchema = z.object({
  password,
  confirmPassword,
}).superRefine(({password, confirmPassword}, ctx) => {
  if (password !== confirmPassword) {
    ctx.addIssue({
      code: 'custom',
      message: 'The passwords did not match'
    });
  }
});
