import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './navBar'
/*
 * @description: Layout
 * @author: Ricy
 */
const Layout = () => {
  return (
    <div className="flex flex-col items-center relative w-full h-full overflow-hidden select-none">
      <NavBar />
      {/* TODO: perf: loading bar */}
      {/* TODO: perf: messagebox bar */}
      {/* <div className="flex-1 flex flex-col items-center overflow-auto"> */}
      {/* route view */}
      <div style={{ width: '100%', height: `100%`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Outlet />
      </div>
    </div>
  )
}
export default Layout