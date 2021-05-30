import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
	return (
		<div>
			<div className="container mx-auto pt-12 pb-12">
				<Component {...pageProps} />
			</div>
		</div>
	)
}

export default MyApp
