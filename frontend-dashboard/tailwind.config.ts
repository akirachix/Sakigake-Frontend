import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        pattern: "url('/images/background.png')",
      },
      colors:{
        mainblue: "#008CBF",
        hoverblue: "#509CDB",
        white: "#fff",
        maingrey:'#484848'
      }
    },
    fontFamily:{
      baloo:[ 'Baloo Bhai 2', 'cursive' ],
      jost:[ 'Jost' ]
    },
  },
  plugins: [],
}
export default config
