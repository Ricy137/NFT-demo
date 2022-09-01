import React, { useState, useEffect, useCallback } from 'react'
import { routeJump } from "../utils/route"

const NavBar = () => {
  const [activeNav, setActiveNav] = useState<string>('/landing');//current route, default: /landing

  const navs = [
    {
      path: '/landing',
      name: 'landing'
    }, {
      path: '/simplenft',
      name: 'simpleNft'
    }, {
      path: '/nftgame',
      name: 'nftGame'
    }
  ]

  //handle router jump
  const handleActiveNav = (path: string, e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    routeJump(path, e)
  }

  useEffect(() => {
    let s = `/${window.location.href.split('/')[3]}`
    if (s == '/') {
      setActiveNav('/landing')
      return
    }
    setActiveNav(s)
  }, [])

  return (
    <div className='flex flex-row justify-around md:justify-center w-4/5 text-white text-base sm:text-lg md:text-xl'>
      {navs.map((nav, index) =>
      (
        <span
          key={index}
          className={`cursor-pointer text-2xl text-left font-TM md:mx-20 mt-4 ${activeNav === nav.path ? 'border-b-2 border-white' : ''
            }`}
          onClick={(e) => handleActiveNav(nav.path, e)}
        >
          {nav.name}
        </span>
      )
      )}
    </div>
  )
}

export default NavBar;