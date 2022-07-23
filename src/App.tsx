import React from 'react';
import TwitterLogo from './assets/twitter-logo.png';

const App = () => {
  return (
    <div className="bg-black h-full flex flex-col justify-center">
      <div className='font-TM text-5xl sm:text-6xl md:text-8xl font-bold bg-gradient-custon text-center py-8'>NFT Demo</div>
      <div className='grid grid-cols-1 md:grid-cols-2 text-white'>
        <div className='font-TM text-base sm:text-lg md:text-xl font-normal mx-[10%]'>
          <p className='mb-8'>Each NFT costs 0.08 Rinkeby ETH and each address can mint 3 NFT at most.</p>
          <p>Don't worry, Rinkeby ETH is fack money.And if you don't have any Rinkeby ETH.Find me on Twitter and I shall send you some &lt;3.</p>
        </div>
        <div className='flex flex-col items-center justify-center text-base sm:text-lg md:text-xl'>
          <button className="bg-[#14F195] border border-black text-black mb-8 py-3.5 px-6 rounded-3xl">Mint 1 NFT</button>
          <button className='border border-white text-white py-3.5 px-6 rounded-3xl'>Check the collection on Rarible</button>
        </div>
      </div>
      <div className='flex flex-row items-center justify-center text-white mt-8'>
        <img src={TwitterLogo} className='w-8 h-7 mr-2'/>
        <a href='https://twitter.com/MaryChao21' className='bg-gradient-custon text-base sm:text-lg md:text-xl font-normal'>built by @MaryChao21 (I'm prefer to be called as Ricy,lol)</a>
      </div>
    </div>
  )
}

export default App;