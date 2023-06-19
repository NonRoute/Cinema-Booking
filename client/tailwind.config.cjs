/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

function generateGridColumns(lastValue) {
	let obj = {}
	for (let i = 13; i < lastValue; i++) {
		obj[`${i}`] = `repeat(${i}, minmax(160px, 1fr))`
	}
	return obj
}

function generateRowColStart(lastValue) {
	let obj = {}
	for (let i = 8; i < lastValue; i++) {
		obj[`${i}`] = `${i}`
	}
	return obj
}

function generateRowSpan(lastValue) {
	let obj = {}
	for (let i = 7; i < lastValue; i++) {
		obj[`span-${i}`] = `span ${i} / span ${i}`
	}
	return obj
}

module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	safelist: [
		{ pattern: /grid-cols-./ },
		{ pattern: /row-start-./ },
		{ pattern: /col-start-./ },
		{ pattern: /row-span./ }
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['IBM Plex Sans Thai', ...defaultTheme.fontFamily.sans]
			},
			gridTemplateRows: {
				150: '36px repeat(150, minmax(10px, 1fr))'
			},
			gridTemplateColumns: {
				...generateGridColumns(100)
			},
			gridRowStart: {
				...generateRowColStart(145)
			},
			gridColumnStart: {
				...generateRowColStart(100)
			},
			gridRow: {
				...generateRowSpan(145)
			}
		}
	},
	plugins: []
}
