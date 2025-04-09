/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				"black-rgba": "rgba(0, 0, 0, 0.5)",
				"black-rgba-low": "rgba(0, 0, 0, 0.05)",
			},
			boxShadow: {
				box: "0 0 20px rgba(0, 0, 0, 0.1)",
			},
		},
	},
	plugins: [],
}
