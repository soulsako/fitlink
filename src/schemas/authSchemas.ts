import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const signUpSchema = z
  .object({
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
})

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

// New schemas for LocalMind onboarding
export const addressConfirmationSchema = z.object({
  streetAddress: z.string().min(1, 'Street address is required'),
  postcode: z.string().min(1, 'Postcode is required'),
  country: z.string().min(1, 'Country is required'),
})

export const phoneVerificationSchema = z.object({
  phoneNumber: z.string().min(1, 'Phone number is required'),
  countryCode: z.string().min(1, 'Country code is required'),
})

export const codeVerificationSchema = z.object({
  verificationCode: z.string().length(6, 'Verification code must be 6 digits'),
})

export type SignInFormData = z.infer<typeof signInSchema>
export type SignUpFormData = z.infer<typeof signUpSchema>
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>
export type AddressConfirmationFormData = z.infer<
  typeof addressConfirmationSchema
>
export type PhoneVerificationFormData = z.infer<typeof phoneVerificationSchema>
export type CodeVerificationFormData = z.infer<typeof codeVerificationSchema>
