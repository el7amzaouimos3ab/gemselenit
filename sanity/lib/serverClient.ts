// sanity/lib/serverClient.ts
import { createClient } from "next-sanity";

export const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2025-08-17",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN, // this token must have create/write permission
});
