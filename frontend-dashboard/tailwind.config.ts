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
        pattern: "url('/media/background.png')",
      },
      colors:{
        textblue:'#008CBF',
        navyblue:'#303972',
        grey:'#E5E5E5',
        textgrey:'#A098AE',
        lightblue:'#B4DCFE',
        lightgrey:'#667085',
        mildgrey:'#484848', 
        darkgrey:'#4F4F4F', 
        bgblue:'#008CBF',
        buttonblue:'#509CDB',
        gregrey:'#CECECE',
        mainblue: "#008CBF",
        hoverblue: "#509CDB",
        white: "#fff",
        maingrey:'#484848',
        bordercolor:'#CECECE',
      }
    },
  },
  plugins: [],
}
export default config
