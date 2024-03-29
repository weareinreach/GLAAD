// @ts-check
import { z } from 'zod'

/**
 * Specify your server-side environment variables schema here. This way you can ensure the app isn't built
 * with invalid env vars.
 */
export const serverSchema = z.object({
	POSTGRES_PRISMA_URL: z.string().url().optional(),
	POSTGRES_URL_NON_POOLING: z.string().url().optional(),
	NODE_ENV: z.enum(['development', 'test', 'production']),
	NEXTAUTH_SECRET: z.string().optional(),
	NEXTAUTH_URL: z
		.preprocess(
			// This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
			// Since NextAuth.js automatically uses the VERCEL_URL if present.
			// eslint-disable-next-line turbo/no-undeclared-env-vars
			(str) => process.env.VERCEL_URL ?? str,
			// VERCEL_URL doesn't include `https` so it cant be validated as a URL
			// eslint-disable-next-line turbo/no-undeclared-env-vars
			process.env.VERCEL ? z.string() : z.string().url()
		)
		.optional(),
})

/**
 * You can't destruct `process.env` as a regular object in the Next.js middleware, so you have to do it
 * manually here.
 *
 * @type {{ [k in keyof z.infer<typeof serverSchema>]: z.infer<typeof serverSchema>[k] | undefined }}
 */
export const serverEnv = {
	POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
	POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
	// eslint-disable-next-line turbo/no-undeclared-env-vars
	NODE_ENV: process.env.NODE_ENV,
	NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
	// eslint-disable-next-line turbo/no-undeclared-env-vars
	NEXTAUTH_URL: process.env.NEXTAUTH_URL,
}

/**
 * Specify your client-side environment variables schema here. This way you can ensure the app isn't built
 * with invalid env vars. To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
	// NEXT_PUBLIC_CLIENTVAR: z.string(),
})

/**
 * You can't destruct `process.env` as a regular object, so you have to do it manually here. This is because
 * Next.js evaluates this at build time, and only used environment variables are included in the build.
 *
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
	// NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
}
