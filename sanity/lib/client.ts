import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2025-08-17",
  token: process.env.SANITY_API_TOKEN, // MUST HAVE WRITE PERMISSIONS
  useCdn: false,
});
