import React, { useEffect, useState } from 'react';
import ReactLoading from "react-loading";
import { ethers } from "ethers";
import { Button } from '@mui/material';
import TwitterLogo from './assets/twitter-logo.png';
import nftDemo from './utils/NftDemo.json';
import { load } from 'dotenv';


const App = () => {
  const [currentAccounts, setCurrentAccounts] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const CONTRACT_ADDRESS = '0x7B03A2B1ef0503e7ac4Ce7c3016b18Eece44c809';

  const checkIfWalletIsConnected = async (): Promise<void> => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log("Make sure you have metamask!");
      alert('Please install metamask first!')
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    let chainId = await ethereum.request({ method: 'eth_chainId' });
    console.log("Connected to chain " + chainId);
    const rinkebyChainId = "0x4";
    if (chainId !== rinkebyChainId) {
      alert("You are not connected to the Rinkeby Test Network!");
    } else {
      if (accounts && accounts !== undefined && accounts !== null && accounts[0]) {
        const account = accounts[0];
        console.log("Found an authorized account", account);
        // setupEventListener();
        setCurrentAccounts(account);
      } else {
        console.log("No authorized account found");
      }
    }
  }

  const connectWallet = async (): Promise<void> => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Please install metamask first!");
        return
      }
      let chainId = await ethereum.request({ method: 'eth_chainId' });
      console.log("Connected to chain " + chainId);
      const rinkebyChainId = "0x4";
      if (chainId !== rinkebyChainId) {
        alert("You are not connected to the Rinkeby Test Network!");
        return
      }
      setLoading(true);
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts && accounts !== undefined && accounts !== null && accounts[0]) {
        console.log('Connected', accounts[0]);
        // setupEventListener() 
        setCurrentAccounts(accounts[0]);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  }

  const askContractToMintNft = async (): Promise<void> => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        setLoading(true);
        console.log(loading);
        const provider = new ethers.providers.Web3Provider(ethereum);
        let chainId = await ethereum.request({ method: 'eth_chainId' });
        console.log("Connected to chain " + chainId);
        const rinkebyChainId = "0x4";
        if (chainId !== rinkebyChainId) {
          alert("You are not connected to the Rinkeby Test Network!");
          setLoading(false);
        } else {
          const signer = provider.getSigner();
          const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, nftDemo.abi, signer);
          console.log("Going to pop wallet now to pay gas...")
          let nftTxn = await connectedContract.mintNFT(1, { value: ethers.utils.parseEther("0.08") });
          alert("Mining...please wait.")
          await nftTxn.wait();
          alert(`Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on rarible. Here's the link: https://testnets.opensea.io/assets/rinkeby/0x7b03a2b1ef0503e7ac4ce7c3016b18eece44c809/0`)
          console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
          setLoading(false);
        }
      } else {
        console.log("Ethereum object doesn't exist!");
        setLoading(false);
      }
    } catch (error) {
      console.log(error)
      if (error.code === -32000) {
        alert('You don\'t have sufficient rinkeby ETH to continue the process, please connect the developer on Twitter for more Rinkeby ETH')
      } else if (error.code === 4001) {
        alert('User rejected the connection requirements')
      } else {
        alert('Something went wrong or you\'ve exceeded the 3 NFT most limit for each address')
      }
      setLoading(false);
    }
  }

  useEffect(
    (): void => {
      checkIfWalletIsConnected()
    }
    , [currentAccounts])

  return (
    <div className="bg-black h-full flex flex-col justify-center">
      <div className='font-TM text-5xl sm:text-6xl md:text-8xl font-bold bg-gradient-custon text-center py-8'>NFT Demo</div>
      <div className='grid grid-cols-1 md:grid-cols-2 text-white'>
        <div className='font-TM text-base sm:text-lg md:text-xl font-normal mx-[10%]'>
          <p className='mb-8'>Each NFT costs 0.08 Rinkeby ETH and each address can mint 3 NFT at most.</p>
          <p>Don't worry, Rinkeby ETH is fack money.And if you don't have any Rinkeby ETH.Find me on Twitter and I shall send you some &lt;3.</p>
        </div>
        <div className='flex flex-col items-center justify-center text-base sm:text-lg md:text-xl'>
          {currentAccounts === '' ? <button
          disabled={loading}
            className={`flex items-center bg-[#14F195] border border-black text-black mb-8 py-3.5 px-6 rounded-3xl ${loading?'opacity-50 cursor-not-allowed':'hover:bg-black hover:border-white hover:text-white'}`} onClick={(e): void => { e.preventDefault(); connectWallet() }}>{loading&&<ReactLoading type="spin" color="#0F31C8" height={18} width={18} className='mr-1.5'/>}Connect Wallet</button> : <button
              className={`bg-gradient-to-r from-bright-green to-bright-blue gradient-animation border border-black text-black mb-8 py-3.5 px-6 rounded-3xl ${loading?'opacity-50 cursor-not-allowed':'hover:bg-black hover:border-white hover:text-white'}`} onClick={(e): void => { e.preventDefault(); askContractToMintNft() }}>{loading&&<ReactLoading type="spin" color="#0F31C8" height={18} width={18} className='mr-1.5'/>}Mint 1 NFT</button>}
          <button className='hover:bg-[#14F195] border border-white hover:border-black text-white hover:text-black py-3.5 px-6 rounded-3xl'>Check the collection on Rarible</button>
        </div>
      </div>
      <div className='flex flex-row items-center justify-center text-white mt-8'>
        <img src={TwitterLogo} className='w-8 h-7 mr-2' />
        <a href='https://twitter.com/MaryChao21' className='bg-clip-text text-transparent bg-gradient-to-r from-bright-green hover:from-bright-blue to-bright-blue hover:bg-[#179CF0] gradient-animation text-base sm:text-lg md:text-xl font-normal'>built by @MaryChao21 (I'm prefer to be called as Ricy,lol)</a>
      </div>
    </div>
  )
}

export default App;