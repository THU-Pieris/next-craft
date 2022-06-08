import Link from 'next/link'
import { lang } from '@/lib/lang'
import { useRouter } from 'next/router'

const Page404 = ({ statusCode }) => {
  const { locale } = useRouter()
  const t = lang[locale]
  return (
    <div className='py-6 sm:py-8 lg:py-12'>
      <div className='max-w-screen-2xl px-4 md:px-8 mx-auto'>
        <div className='flex flex-col items-center'>
          <div className='inline-flex items-center gap-2.5 mb-8'>
          <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            width="24" height="24" viewBox="0 0 99 99"
            preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,99.000000) scale(0.100000,-0.100000)">
            <path d="M296 745 c-7 -19 3 -21 95 -15 44 3 83 2 86 -3 5 -8 -70 -150 -162
            -307 -69 -117 -105 -184 -105 -199 0 -16 53 -27 115 -23 l60 5 -45 11 c-62 15
            -63 36 -2 149 75 140 211 370 225 380 7 4 38 6 70 4 75 -4 100 -27 100 -90 -2
            -113 -118 -216 -232 -205 -21 2 -37 0 -35 -4 10 -15 104 -8 157 12 175 65 228
            251 84 291 -32 9 -80 9 -197 -1 -107 -8 -163 -8 -182 -1 -20 8 -28 7 -32 -4z"/>
            </g>
          </svg>
          </div>

          <p className='text-sm md:text-base font-semibold uppercase mb-4'>
            {t.ERROR.MESSAGE}
          </p>
          <h1 className='text-gray-800 text-2xl md:text-3xl font-bold text-center mb-2'>
            {statusCode
              ? `${statusCode} - ${t.ERROR.TITLE}`
              : `Error - ${t.ERROR.TITLE}`}
          </h1>

          <p className='max-w-screen-md text-gray-500 md:text-lg text-center mb-12'>
            {t.ERROR.HELP_TEXT}
          </p>

          <Link href='/'>
            <a className='inline-block bg-gray-200 hover:bg-gray-300 focus-visible:ring ring-indigo-300 text-gray-500 active:text-gray-700 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3'>
              {t.ERROR.BACK_TO_HOME}
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Page404
