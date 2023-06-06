import { Anchor, Button, createStyles, Group, MantineProvider, Text } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Analytics } from '@vercel/analytics/react'
import { type AppType } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { appWithTranslation, useTranslation } from 'next-i18next'

import { Navbar } from '~/components/Navbar/Navbar'
import { fontWorkSans, styleCache, theme } from '~/styles'
import { api } from '~/utils/api'

import i18nConfig from '../../next-i18next.config'

const useStyles = createStyles((theme, { showButton, isHome }: { showButton: boolean; isHome: boolean }) => ({
	homeButton: {
		opacity: showButton ? '1' : '0',
		[theme.fn.smallerThan('md')]: {
			opacity: 0,
			display: 'none',
		},
	},
	artistCredit: {
		opacity: isHome ? '1' : '0',
	},
}))

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
	const router = useRouter()
	const { asPath, pathname, query, locale } = router
	const { t } = useTranslation()
	const { classes } = useStyles({ showButton: router.pathname !== '/', isHome: router.pathname === '/' })
	return (
		<>
			<Head>
				<title>{t('page-title.general')}</title>
				<meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
			</Head>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{ ...theme, fontFamily: fontWorkSans.style.fontFamily }}
				emotionCache={styleCache}
			>
				<ModalsProvider>
					<SessionProvider session={session}>
						<Navbar />
						<Component {...pageProps} />
						<Group position='apart' w='100%' p={40}>
							<Button
								component='a'
								href='https://inreach.kindful.com/'
								target='_blank'
								rel='noreferrer'
								className={classes.homeButton}
							>
								{t('donate')}
							</Button>
							<Text className={classes.artistCredit} fw={500}>
								{t('artist-credit')}
							</Text>
							<Anchor
								variant='category'
								tt='uppercase'
								// eslint-disable-next-line @typescript-eslint/no-misused-promises
								onClick={() =>
									router.replace({ pathname, query }, asPath, { locale: locale === 'en' ? 'es' : 'en' })
								}
							>
								{t('nav.switch-lang')}
							</Anchor>
						</Group>
					</SessionProvider>
				</ModalsProvider>
				<Notifications />
			</MantineProvider>
			<Analytics />
			<ReactQueryDevtools initialIsOpen={false} />
		</>
	)
}

export default api.withTRPC(appWithTranslation(MyApp, i18nConfig))
