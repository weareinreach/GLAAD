import { Button as MantineButton, createStyles } from '@mantine/core'

import type { ButtonProps } from '@mantine/core'
import type { ReactNode } from 'react'

export const Button = ({ children, variant = 'primary', size, type }: Props) => {
	const useStyles = createStyles((theme) => ({
		root: {
			borderRadius: 0,
			fontWeight: 600,
			height: 'auto',
			padding: '15px',
			textAlign: 'center',
			width: '175px',
			backgroundColor: variant === 'primary' ? theme.other.colors.black : theme.other.colors.midGray,
			['&:hover']: {
				backgroundColor: variant === 'primary' ? theme.other.colors.midGray : theme.other.colors.black,
			},
		},
		label: {
			whiteSpace: 'normal',
			textTransform: variant === 'secondary' ? 'uppercase' : undefined,
		},
	}))
	const { classes } = useStyles()

	return (
		<MantineButton
			size={size}
			classNames={{
				...classes,
			}}
			type={type}
		>
			{children}
		</MantineButton>
	)
}

type Props = {
	children: ReactNode
	variant?: 'primary' | 'secondary'
	type?: 'submit'
	size?: ButtonProps['size']
}
