/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['IBM Plex Sans Thai', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: []
}
