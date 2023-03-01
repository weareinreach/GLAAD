import { Modal, Group, Text, TextInput, FileInput, Select, useMantineTheme } from '@mantine/core'
import { Dropzone, DropzoneProps } from '@mantine/dropzone'
import { useForm } from '@mantine/form'
import { useMediaQuery } from '@mantine/hooks'
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react'
import { useState, useRef } from 'react'

import { Button } from '../Button/Button'

export const ModalForm = () => {
	const [opened, setOpened] = useState(false)
	const imageInput = useRef(null)
	const isMobile = useMediaQuery('(max-width: 1000px)')

	const form = useForm({
		initialValues: {
			name: '',
			email: '',
			storyJoy: '',
			keyJoy: '',
			storyAccess: '',
		},

		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
			storyJoy: (value) => (value.length > 0 ? null : "Joy field can't be blank"),
			keyJoy: (value) => (value.length > 0 ? null : 'Please choose a category'),
			storyAccess: (value) => (value.length > 0 ? null : "Access field can't be blank"),
		},
	})

	const submitStory = () => {
		// Implement when trpc entrypoints are ready

		// Remember to check for imageInput.files[0] in case a user submits an image

		form.validate()
		console.log(form.values)
	}

	// dropzone functions

	const theme = useMantineTheme()

	return (
		<>
			<Modal
				opened={opened}
				onClose={() => setOpened(false)}
				title='Participate today!'
				fullScreen={isMobile}
			>
				<form
					onSubmit={(e) => {
						e.preventDefault()
						submitStory()
					}}
				>
					<TextInput label='Name' {...form.getInputProps('name')} />
					<TextInput label='Email' withAsterisk {...form.getInputProps('email')} />
					<TextInput label='Joy' withAsterisk {...form.getInputProps('storyJoy')} />
					<TextInput label='Access' withAsterisk {...form.getInputProps('storyAccess')} />
					<Select
						label='Category'
						withAsterisk
						placeholder='Pick one'
						data={[
							{ value: 'queer', label: 'Queer' },
							{ value: 'bipoc', label: 'BIPOC' },
							{ value: 'disabled', label: 'Disabled' },
						]}
						{...form.getInputProps('keyJoy')}
					/>
					<FileInput ref={imageInput} placeholder='Pick an image' label='Image' withAsterisk />
					<Dropzone
						onDrop={(files) => console.log('accepted files', files)}
						onReject={(files) => console.log('rejected files', files)}
						maxSize={3 * 1024 ** 2}
					>
						<Group position='center' spacing='xl' style={{ minHeight: 220, pointerEvents: 'none' }}>
							<Dropzone.Accept>
								<IconUpload size={50} stroke={1.5} />
							</Dropzone.Accept>
							<Dropzone.Idle>
								<IconPhoto size={50} stroke={1.5} />
							</Dropzone.Idle>
						</Group>
						<div>
							<Text size='xl' inline>
								{'Drag image here or click to select files'}
							</Text>
						</div>
					</Dropzone>
					<Group position='right' mt='md'>
						<Button type='submit'>{'Submit'}</Button>
					</Group>
				</form>
			</Modal>

			<Group position='center'>
				<div onClick={() => setOpened(true)}>
					<Button variant='secondary'>{'CLICK HERE TO PARTICIPATE'}</Button>
				</div>
			</Group>
		</>
	)
}
