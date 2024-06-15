import z from 'zod'

const createUserValidation = z.object({
    body: z.object({
      name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    role: z.enum(["user", "admin"]),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    phone: z.string().min(10, "Phone number must be at least 10 characters long").max(15, "Phone number must be at most 15 characters long"),
    address: z.string().min(1, "Address is required")
    })
})
const updateUserValidation = z.object({
	body: z.object({
		name: z.string().min(1, "Name is required").optional(),
		email: z.string().email("Invalid email address").optional(),
		role: z.enum(["user", "admin"]).optional(),
		password: z
			.string()
			.min(6, "Password must be at least 6 characters long")
			.optional(),
		phone: z
			.string()
			.min(10, "Phone number must be at least 10 characters long")
			.max(15, "Phone number must be at most 15 characters long")
			.optional(),
		address: z.string().min(1, "Address is required").optional(),
	}),
});

export const UserValidatios = {
    createUserValidation,updateUserValidation
}