import { z } from "zod";

const createFacilityValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Name is required" })
      .nonempty("Name cannot be empty"),
    description: z
      .string({ required_error: "Description is required" })
      .nonempty("Description cannot be empty"),
    pricePerHour: z
      .number({ required_error: "Price per hour is required" })
      .positive("Price per hour must be a positive number"),
    location: z
      .string({ required_error: "Location is required" })
      .nonempty("Location cannot be empty"),
    isDeleted: z.boolean().default(false),
  }),
});

const updateFacilityValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Name is required" })
      .nonempty("Name cannot be empty")
      .optional(),
    description: z
      .string({ required_error: "Description is required" })
      .nonempty("Description cannot be empty")
      .optional(),
    pricePerHour: z
      .number({ required_error: "Price per hour is required" })
      .positive("Price per hour must be a positive number")
      .optional(),
    location: z
      .string({ required_error: "Location is required" })
      .nonempty("Location cannot be empty")
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const FacilityValidations = {
  createFacilityValidationSchema,
  updateFacilityValidationSchema,
};
