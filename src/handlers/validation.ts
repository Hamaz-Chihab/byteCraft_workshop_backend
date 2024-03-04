import * as yup from "yup";

const CourseFilterSchema = yup.object({
  courseId: yup.string().optional(),
  page: yup.number().positive().integer().min(1).default(1),
  limit: yup.number().positive().integer().min(1).max(50).default(10),
});

async function validateRequest(data: any, schema: yup.Schema<any>) {
  try {
    const value = await schema.validate(data, { abortEarly: false });
    return { value };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return { error };
    } else {
      throw error; // Re-throw non-validation errors
    }
  }
}

export { CourseFilterSchema, validateRequest };
