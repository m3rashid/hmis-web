/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}",],
	theme: {
		extend: {},
		fontFamily: {
			'display': ['Oswald', 'sans-serif'],
			'body': ['Open Sans', 'sans-serif'],
		}
	},
	plugins: [
		require('@tailwindcss/forms'),
	],
}

