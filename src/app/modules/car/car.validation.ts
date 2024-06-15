import z from "zod";

const createCarSchemaValidation = z.object({
	body: z.object({
		name: z.string({ message: "Name is required!" }),
		description: z.string({ message: "Description is required!" }),
		color: z.string({ message: "Color is required!" }),
		isElectric: z.boolean(),
		features: z
			.array(z.string())
			.nonempty({ message: "Features is required!" }),
		pricePerHour: z
			.number()
			.positive({ message: "Price must be a positive number!" }),
	}),
});
const updateCarSchemaValidation = z.object({
	body: z.object({
		name: z.string({ message: "Name is required!" }).optional(),
		description: z.string({ message: "Description is required!" }).optional(),
		color: z.string({ message: "Color is required!" }).optional(),
		isElectric: z.boolean().optional(),
		features: z
			.array(z.string())
			.nonempty({ message: "Features is required!" })
			.optional(),
		pricePerHour: z
			.number()
			.positive({ message: "Price must be a positive number!" })
			.optional(),
		status: z.array(z.string()).optional(),
	}),
});

export const CarValidations = {
	createCarSchemaValidation,
	updateCarSchemaValidation,
};
