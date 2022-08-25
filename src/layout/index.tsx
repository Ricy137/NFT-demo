import React from 'react'
// import UserBar from './userbar'
import { Outlet } from 'react-router-dom'
import FreeScrollBar from 'react-free-scrollbar'
/*
 * @description: Layout
 * @author: Victor
 */
const Layout = () => {
  return (
    <div className="relative w-full h-full overflow-auto select-none">
      {/* <UserBar /> */}
      {/* TODO: perf: loading bar */}
      {/* TODO: perf: messagebox bar */}
      {/* <div className="flex-1 flex flex-col items-center overflow-auto"> */}
      {/* route view */}
      <div style={{ width: '100%', height: `100%` }}>
        {/* <FreeScrollBar style={{ width: '100%', height: '100%' }} autohide={true} fixed={true}> */}
          <Outlet />
        {/* </FreeScrollBar> */}
      </div>
    </div>
  )
}
export default Layout