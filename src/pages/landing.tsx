import React, { useCallback } from 'react';
import { routeJump } from "../utils/route"

const Landing: React.FC = () => {
  const handleActiveNav = useCallback((path: string, e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    routeJump(path, e)
  }, [])

  return (
    //for further modules adding <div className='grid grid-cols-1 lg:grid-cols-2 gap-20 text-black max-w-screen-2xl w-full'>
    <div className='text-black max-w-screen-2xl w-4/5 mt-20 flex flex-col items-center'>
      <div className='bg-[#14F195] w-4/5 p-8 rounded-2xl cursor-pointer' onClick={(e) => handleActiveNav('/simplenft', e)}>
        <h1 className='font-bold text-2xl md:text-4xl mb-5'>Simple NFT Project</h1>
        <p className='font-TM text-base sm:text-lg md:text-xl mb-5'>A simple NFT sample on Goerly testnets and will charge 0.08 Goerly ETH for every item. It has 8080 items at most and every address can only mint 3 items at most.</p>
        {/* <button onClick={(e) => routeJump('/simplenft', e)} className='border border-black hover:border-black bg-black hover:bg-white text-white hover:text-black hover:text-black py-3.5 px-6 rounded-3xl'>Go to the Project</button> */}
      </div>
    </div>
  )
}

export default Landing;