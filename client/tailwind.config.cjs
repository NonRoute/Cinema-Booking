/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

function generateGridColumns(lastValue) {
	let obj = {}
	for (let i = 13; i < lastValue; i++) {
		obj[`${i}`] = `repeat(${i},  minmax(0px, 1fr))`
	}
	return obj
}

module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['IBM Plex Sans Thai', ...defaultTheme.fontFamily.sans]
			},
			gridTemplateRows: {
				288: '36px repeat(288, minmax(10px, 1fr))'
			},
			gridTemplateColumns: {
				...generateGridColumns(100)
			}
		}
	},
	plugins: []
}
