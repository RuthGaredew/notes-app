/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Your project files
    "./node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}", // Include shadcn components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}