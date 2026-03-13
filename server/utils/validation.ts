import { z } from 'zod'

export const memberRegistrationSchema = z.object({
  fullName: z.string().min(3, 'Nama harus minimal 3 karakter'),
  email: z.string().email('Email tidak valid'),
  username: z.string().min(3, 'Username harus minimal 3 karakter'),
  password: z.string().min(6, 'Password harus minimal 6 karakter'),
  phone: z.string().min(10, 'Nomor telepon tidak valid'),
  birthDate: z.string(),
  address: z.string().min(5, 'Alamat tidak valid'),
  city: z.string().min(2),
  province: z.string().min(2),
  interests: z.array(z.string()),
  experience: z.string()
})

export const memberLoginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6),
  rememberMe: z.boolean().optional()
})

export const adminLoginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6)
})
