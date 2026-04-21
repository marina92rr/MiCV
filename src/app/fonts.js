import localFont from 'next/font/local'

//Fuentes principales: ROBOTO/ ROBOTO SERIF
export const roboto = localFont({
  src: [
    {
      path: './fonts/Roboto-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Roboto-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-roboto',
  display: 'swap',
})

export const serif = localFont({
  src: [
    {
      path: './fonts/RobotoSerif_28pt-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/RobotoSerif_28pt-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-serif',
  display: 'swap',
})