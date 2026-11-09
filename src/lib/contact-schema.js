import { z } from "zod";
export const contactSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Please enter your name.")
        .max(80, "That name is a little too long."),
    email: z
        .string()
        .trim()
        .email("Enter a valid email address.")
        .max(120, "That email address is too long."),
    subject: z
        .string()
        .trim()
        .min(3, "Add a short subject.")
        .max(120, "Keep the subject under 120 characters."),
    message: z
        .string()
        .trim()
        .min(10, "Tell me a little more — at least 10 characters.")
        .max(2000, "Keep the message under 2000 characters."),
    company: z.string().max(200).optional(),
});
