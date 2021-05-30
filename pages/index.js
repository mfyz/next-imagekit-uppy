import React, { useState } from 'react'
import Head from 'next/head'
import Uppy from '@uppy/core'
import { DragDrop, ProgressBar } from '@uppy/react'
import ImageKitUppyPlugin from 'imagekit-uppy-plugin'
import { IKImage, IKContext, IKUpload } from 'imagekitio-react'

import '@uppy/core/dist/style.css'
import '@uppy/drag-drop/dist/style.css'
import '@uppy/progress-bar/dist/style.css'

import { H1 } from '../components/headings'

const uppy = new Uppy({
	debug: true,
	meta: { type: 'avatar' },
	restrictions: { maxNumberOfFiles: 1 },
	autoProceed: true,
})
.use(ImageKitUppyPlugin, {
	id: 'ImageKit',
	publicKey: process.env.NEXT_PUBLIC_IK_PUBLIC_KEY,
	authenticationEndpoint: '/api/imagekit-auth',
	folder: '/featuristik'
})

const SectionTitle = ({ children }) => <H1 className="mt-16">{children}</H1>

export default function Home() {
	const [file, setFile] = useState(null)

	uppy.on('complete', (result) => {
		const url = result.successful[0].uploadURL
		setFile(url)
	})

	uppy.on('upload-progress', (file, progress) => {
		const percent = Math.round((progress.bytesUploaded / progress.bytesTotal) * 100)
		console.log(file.id, percent + '%')
	})

	return (
		<div>
			<IKContext urlEndpoint="https://ik.imagekit.io/mfyz/featuristik">
				<Head>
					<title>Tailwind CSS Test</title>
				</Head>
				<main>
					<SectionTitle>Upload with Uppy</SectionTitle>
					<p>
						Automatic uploads to ImageKit
					</p>
					<DragDrop
						uppy={uppy}
						locale={{
							strings: {
								dropHereOr: 'Drop here or %{browse}',
								browse: 'browse'
							}
						}}
					/>
					<ProgressBar
						uppy={uppy}
						hideAfterFinish
					/>

					{file && (
						<div className="mt-6">
							<IKImage
								src={file}
								transformation={[
									{
										"height": "300",
										"width": "300",
									}
								]}
								lqip={{ active: true, quality: 20, blur: 10 }} // low-quality image placeholder
								loading="lazy"
							/>
						</div>
					)}
				</main>
			</IKContext>
		</div>
	)
}
