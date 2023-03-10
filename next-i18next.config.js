// @ts-check
/* eslint-disable import/no-unused-modules */
/**
 * @template {import('next-i18next').UserConfig} T
 * @param {T} config
 * @constraint {{import('next-i18next').UserConfig}}
 */
const config = {
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'es'],
	},
	reloadOnPrerender: process.env.NODE_ENV !== 'production',
	nonExplicitSupportedLngs: true,
	react: { useSuspense: false },
}
module.exports = config
