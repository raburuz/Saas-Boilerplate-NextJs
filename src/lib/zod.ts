/* LIBRARIES */
import { AnyZodObject, ZodError, z } from "zod";

/**
 * Safety type: Use this type to safely infer the runtime values of a Zod schema.
 * 
 * @template T - The Zod schema type from which you want to infer values.
 * @returns The inferred runtime type for the values defined by the Zod schema.
 * 
 * Example usage: 
 * 
 * type ZodSchema = InferSchemaValues < typeof YourZodSchema > 
 */
export type InferSchemaValues<T extends z.ZodType<any, any>> = z.infer<T>;

interface IZodValidate<T extends AnyZodObject>{
  schema: T,
  data: InferSchemaValues<T>,
}

/**
 * API REQUEST VALIDATOR
 * 
 * A utility function for validating API request data against a Zod schema.
 * 
 * @param {IZodValidate<T>} params - An object containing the Zod schema and data to validate.
 * @returns {Promise<z.infer<T>>} A Promise that resolves with the validated data or rejects with an error message.
 *
 * Example usage: 
 * 
 * const response = await validateApiRequestWithSchema( { YourZodSchema, data: { body: await request.json() } } );
 */
export const validateApiRequestWithSchema  = async <T extends AnyZodObject>( { schema, data }: IZodValidate<T> ): Promise<z.infer<T>> => {

  return new Promise(async( resolve, reject ) => {
    try {
      const response = await schema.parseAsync(data);
      resolve(response);
    } catch (error) {
      const message = (error as ZodError).issues[0].message;
      console.log(error);
      reject(message);
    }
  })
}

