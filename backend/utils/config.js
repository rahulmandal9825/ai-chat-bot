import z from 'zod';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });


const envSchema = z.object({
  OPENAI_API_KEY: z.string().trim().min(1),
  PINECONE_API_KEY: z.string().trim().min(1),
  PINECONE_ENVIRONMENT: z.string().trim().min(1),
  PINECONE_INDEX_NAME: z.string().trim().min(1),
  PDF_PATH: z.string().trim().min(1),
  INDEX_INIT_TIMEOUT: z.coerce.number().min(1),
});

export const env = envSchema.parse(process.env);