import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import BLOG from '@/blog.config'
import { lang } from '@/lib/lang'
import { useRouter } from 'next/router'
import {
  ColorSwatchIcon,
  MenuIcon
} from '@heroicons/react/outline'
import Social from './Social.js'
import ThemeSwitcher from './ThemeSwitcher.js'
import LangSwitcher from './LangSwitcher.js'

const NavBar = () => {
  const router = useRouter()
  const { locale } = useRouter()
  const t = lang[locale]
  const [showMenu, setShowMenu] = useState(false)

  let activeMenu = ''
  if (router.query.slug) {
    activeMenu = '/' + router.query.slug
  } else {
    activeMenu = router.pathname
  }

  const links = [
    {
      id: 0,
      name: t.NAV.INDEX,
      to: '/',
      icon: <ColorSwatchIcon className='inline-block mb-1 h-5 w-5' />,
      show: true
    },
    {
      id: 1,
      name: t.NAV.THEME2,
      to: '/theme2',
      icon: <ColorSwatchIcon className='inline-block mb-1 h-5 w-5' />,
      show: true
    },
    {
      id: 2,
      name: t.NAV.THEME3,
      to: '/theme3',
      icon: <ColorSwatchIcon className='inline-block mb-1 h-5 w-5' />,
      show: true
    }
  ]
  return (
    <div className='flex'>
      <ul className='hidden md:flex md:gap-1'>
        {links.map(
          (link) => link.show && (
            <Link passHref key={link.id} href={link.to}>
              <li className={`${activeMenu === link.to ? 'bg-gray-200 dark:bg-gray-700' : ''} hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-lg block py-1 px-2 nav`}>
                <a className='font-light'>
                  {link.icon}
                  <span className='inline-block m-1'>{link.name}</span>
                </a>
              </li>
            </Link>
          )
        )}
      </ul>

      <ThemeSwitcher />
      <LangSwitcher />

      <div className='md:hidden mr-2 block '>
        <button
          type='button'
          onClick={() => setShowMenu((showMenu) => !showMenu)}
          className='hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-lg block p-2 -mr-3 md:pb-3'
        >
          <MenuIcon className='inline-block mb-1 h-5 w-5' />
        </button>
        {showMenu && (
          <div className='absolute right-0 w-40 mr-4 mt-2 origin-top-right bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600 rounded-md shadow-lg outline-none'>
            <div className='py-1'>
              {links.map(
                (link) =>
                  link.show && (
                    <Link passHref key={link.id} href={link.to}>
                      <a className='hover:bg-gray-100 dark:hover:bg-gray-600 font-light block justify-between w-full px-4 py-2 leading-5'>
                        {link.icon}
                        <span className='m-1'>{link.name}</span>
                      </a>
                    </Link>
                  )
              )}
            </div>
            <div className='px-4 py-4'>
              <Social />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const Header = ({ navBarTitle }) => {
  const [showTitle, setShowTitle] = useState(false)
  const useSticky = !BLOG.autoCollapsedNavBar
  const navRef = useRef(null)
  const sentinalRef = useRef([])
  const handler = ([entry]) => {
    if (navRef && navRef.current && useSticky) {
      if (!entry.isIntersecting && entry !== undefined) {
        navRef.current?.classList.add('sticky-nav-full')
      } else {
        navRef.current?.classList.remove('sticky-nav-full')
      }
    } else {
      navRef.current?.classList.add('remove-sticky')
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 100) {
        setShowTitle(true)
      } else {
        setShowTitle(false)
      }
    })

    const obvserver = new window.IntersectionObserver(handler)
    obvserver.observe(sentinalRef.current)
    // Don't touch this, I have no idea how it works XD
    // return () => {
    //   if (sentinalRef.current) obvserver.unobserve(sentinalRef.current)
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentinalRef])
  return (
    <>
      <div className='observer-element h-4 md:h-12' ref={sentinalRef}></div>
      <div
        className='sticky-nav m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8 bg-opacity-60 max-w-2xl px-4'
        id='sticky-nav'
        ref={navRef}
      >
        <div className='flex items-center'>
          <Link passHref href='/'>
            <a aria-label={BLOG.title}>
              <div className='h-6 hover:text-blue-500 dark:hover:text-blue-500 fill-current'>
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
            </a>
          </Link>
          {navBarTitle ? (
            <p className={`ml-2 font-medium ${!showTitle ? 'hidden' : 'hidden xl:block'}`}>
              {navBarTitle}
            </p>
          ) : (
            <p className={`ml-2 font-medium ${!showTitle ? 'hidden' : 'hidden xl:block'}`}>
              {BLOG.title},{' '}
              <span className='font-normal'>{BLOG.description}</span>
            </p>
          )}
        </div>
        <NavBar />
      </div>
    </>
  )
}

export default Header
