import ImageKit from 'imagekit'

const { NEXT_PUBLIC_IK_PUBLIC_KEY, IK_PRIVATE_KEY } = process.env

export default function (req, res) {
	const imagekit = new ImageKit({
		publicKey : NEXT_PUBLIC_IK_PUBLIC_KEY,
		privateKey : IK_PRIVATE_KEY,
		urlEndpoint : 'https://ik.imagekit.io/mfyz/'
	});

	const authenticationParameters = imagekit.getAuthenticationParameters();

	res.status(200).json(authenticationParameters)
}