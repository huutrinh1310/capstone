/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
          primary: {
                50: '#6265FF',
                100: '#EFEFFD',
                200: '#D7D7F9',
          },
          text: {
            200: '#7E7E7E',
          },
          'bg-primary': 'bg-gradient-to-r from-[#F9F9FB] to-[#EFEFFB]',
          'bg-icon': 'bg-gradient-to-r from-[#4F52CE] to-[#5069C9]',
          'primary-text' : '#393BB4',
          'bg-table-header': '#F5F5F5',

      },

    },
  },
  plugins: [
    require("daisyui"),
  ],
}
