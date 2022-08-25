import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './navBar'
// import FreeScrollBar from 'react-free-scrollbar'
/*
 * @description: Layout
 * @author: Ricy
 */
const Layout = () => {
  return (
    <div className="flex flex-col items-center relative w-full h-full overflow-auto select-none">
      <NavBar />
      {/* TODO: perf: loading bar */}
      {/* TODO: perf: messagebox bar */}
      {/* <div className="flex-1 flex flex-col items-center overflow-auto"> */}
      {/* route view */}
      <div style={{ width: '100%', height: `100%`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* <FreeScrollBar style={{ width: '100%', height: '100%' }} autohide={true} fixed={true}> */}
        <Outlet />
        {/* </FreeScrollBar> */}
      </div>
    </div>
  )
}
export default Layout