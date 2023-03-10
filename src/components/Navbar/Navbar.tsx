import { Header, Container, createStyles, Burger, Drawer, Text, Button } from '@mantine/core'
import { IconArrowBigLeftFilled } from '@tabler/icons-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

const HEADER_HEIGHT = 75

export const useStyles = createStyles((theme) => ({
	glaadGray: {
		backgroundColor: theme.other.colors.glaadGray,
	},

	navbar: {
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		height: '100%',

		['& a']: {
			color: theme.colors.gray[0],
			flexDirection: 'row',
			textAlign: 'center',
			justifyContent: 'center',
			alignItems: 'center',
			fontSize: theme.fontSizes.lg,
		},

		[`@media (max-width: ${theme.breakpoints.md}px)`]: {
			display: 'none',
		},
	},

	burger: {
		display: 'flex',
		alignItems: 'center',
		height: '100%',

		[`@media (min-width: ${theme.breakpoints.md}px)`]: {
			display: 'none',
		},
	},

	navlink: {
		color: theme.colors.gray[0],
		display: 'flex',
		width: '100%',
		height: '100%',
		fontStyle: 'italic',
		flexDirection: 'column',
		marginTop: theme.spacing.md,
		marginBottom: theme.spacing.md,
		textDecoration: 'none',

		['&:active, &:hover']: {
			textDecoration: 'underline',
		},
	},
}))

type LinkData = Array<[string, string]>

const NavLinks = () => {
	const { classes } = useStyles()

	const linksInfo: LinkData = [
		['learn', '#'],
		['act', '#'],
		['about', '#'],
		['share', '#'],
		['find resources', '#'],
	]

	const links = linksInfo.map((linkInfo) => {
		const [title, href] = linkInfo
		return (
			<Link key={title} href={href} className={classes.navlink}>
				{title.toUpperCase()}
			</Link>
		)
	})

	return <>{links}</>
}

const HomeButton = () => (
	<Link href='/'>
		<Button leftIcon={<IconArrowBigLeftFilled />} color='gray.0' variant='outline'>
			{' Home'}
		</Button>
	</Link>
)

// This type is only needed when trying to make a story for a page
// to check whether the button to go to the main page works
type pathProp = { path?: string }

const HamburgerMenu = ({ path }: pathProp) => {
	const [opened, setOpened] = useState(false)
	const { classes } = useStyles()

	return (
		<Container className={classes.burger} sx={{ justifyContent: path === '/' ? 'end' : 'space-between' }}>
			<Drawer
				opened={opened}
				onClose={() => setOpened(false)}
				title={
					<Text fz='md' fw={900} color='gray.0'>
						{'InReach X GLAAD'}
					</Text>
				}
				size='sm'
				padding='xl'
				styles={(theme) => ({
					drawer: {
						backgroundColor: theme.other.colors.glaadGray,
					},
				})}
			>
				<NavLinks />
			</Drawer>
			{path !== '/' ? <HomeButton /> : undefined}
			<Burger
				opened={opened}
				onClick={() => setOpened((o) => !o)}
				size='lg'
				color='#FEFEFF'
				aria-label='burgerButton'
				title='Open sidenav'
			/>
		</Container>
	)
}

export const Navbar = ({ path }: pathProp) => {
	const { classes } = useStyles()
	const router = useRouter()
	return (
		<Header height={HEADER_HEIGHT} className={classes.glaadGray}>
			<Container className={classes.navbar} fluid>
				<NavLinks />
			</Container>
			<HamburgerMenu path={path || router.pathname} />
		</Header>
	)
}
