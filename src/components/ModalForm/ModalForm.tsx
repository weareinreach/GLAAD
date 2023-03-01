import { Modal, Group, Text, TextInput, FileInput, Select, Input } from '@mantine/core'
import { Dropzone } from '@mantine/dropzone'
import { useForm } from '@mantine/form'
import { useMediaQuery } from '@mantine/hooks'
import { IconUpload, IconPhoto } from '@tabler/icons-react'
import { useState, useRef } from 'react'
import AvatarEditor from 'react-avatar-editor'

import { Button } from '../Button/Button'

import type { FileWithPath } from '@mantine/dropzone'
import type { ChangeEvent } from 'react'

export const ModalForm = () => {
	const [opened, setOpened] = useState(false)
	const imageInput = useRef<HTMLDivElement>(null)
	const isMobile = useMediaQuery('(max-width: 1000px)')
	const [files, setFiles] = useState<FileWithPath[]>([])
	const [scale, setScale] = useState(0)

	const form = useForm({
		initialValues: {
			name: '',
			email: '',
			storyJoy: '',
			keyJoy: '',
			storyAccess: '',
			files: '',
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
		console.log(files)
		console.log(form.values)
	}

	// AvatarEditor functions
	const handleScale = (e: ChangeEvent<HTMLInputElement>) => {
		const scale = parseFloat(e.target.value)
		setScale(scale)
		console.log(scale)
	}

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
					{/* <FileInput ref={imageInput} placeholder='Pick an image' label='Image' withAsterisk /> */}
					<Input.Label>{'Image'}</Input.Label>
					<Dropzone onDrop={(files) => setFiles(files)}>
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
				<AvatarEditor
					image='https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGZhY2V8ZW58MHx8MHx8&w=1000&q=80'
					width={250}
					height={250}
					border={50}
					color={[255, 255, 255, 0.6]} // RGBA
					scale={scale}
					rotate={0}
				/>
				<br />
				<input
					name='scale'
					type='range'
					onChange={(e) => handleScale(e)}
					max='3'
					min='1'
					step='0.01'
					defaultValue='1'
				/>
			</Modal>

			<Group position='center'>
				<div onClick={() => setOpened(true)}>
					<Button variant='secondary'>{'CLICK HERE TO PARTICIPATE'}</Button>
				</div>
			</Group>
		</>
	)
}
