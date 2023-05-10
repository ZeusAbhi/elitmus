import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    BACKENDURL: z.string(),
  },
  client: {
    NEXT_PUBLIC_BACKENDURL: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_BACKENDURL: process.env.NEXT_PUBLIC_BACKENDURL,
    BACKENDURL: process.env.BACKENDURL,
  },
});

