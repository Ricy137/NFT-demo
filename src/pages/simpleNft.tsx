import React, { useEffect, useState } from 'react';
import ReactLoading from "react-loading";
import { ethers } from "ethers";
import TwitterLogo from '@assets/twitter-logo.png';
import nftDemo from '../utils/NftDemo.json';
import { showToast } from '@components/showPopup/Toast';

const SimpleNft = () => {
  const [currentWidth, setCurrentWidth] = useState<number>(1920);
  const [currentAccounts, setCurrentAccounts] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const CONTRACT_ADDRESS = '0x7763037183e18dBf6f968920bFa54812b4553005';
  const GOERLI_CHAIN_ID = "0x5";

  const onWidthChange = (): void => {
    window.screenWidth = document.body.clientWidth;
    setCurrentWidth(window.screenWidth);
  }

  window.onresize = (): void => {
    onWidthChange();
  }

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (await !ethereum.enable()) {
        console.log("Make sure you have metamask!");
        showToast(`Sorry, you must have metamask first`, { type: 'failed' });
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      let chainId = await ethereum.request({ method: 'eth_chainId' });
      console.log("Connected to chain " + chainId);
      if (chainId !== GOERLI_CHAIN_ID) {
        showToast(`You are not connected to Goerli Test Network.`, { type: 'failed' });
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
    }catch(error){
      showToast(`Oops, ${error?.message}`, { type: 'failed' });
    }
    
  }

  const connectWallet = async (): Promise<void> => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        showToast(`Sorry, you must have metamask first`, { type: 'failed' });
        return
      }
      let chainId = await ethereum.request({ method: 'eth_chainId' });
      console.log("Connected to chain " + chainId);
      if (chainId !== GOERLI_CHAIN_ID) {
        showToast(`You are not connected to Goerli Test Network.`, { type: 'failed' });
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
    } finally {
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
        if (chainId !== GOERLI_CHAIN_ID) {
          showToast(`You are not connected to Goerli Test Network.`, { type: 'failed' });
          setLoading(false);
        } else {
          const signer = provider.getSigner();
          const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, nftDemo.abi, signer);
          console.log("Going to pop wallet now to pay gas...")
          let nftTxn = await connectedContract.mintNFT(1, { value: ethers.utils.parseEther("0.08") });
          showToast(`Transaction\'s sent,mining... please wait`, { type: 'info' });
          await nftTxn.wait();
          console.log(`Mined, see transaction: https://goerli.etherscan.io/tx/${nftTxn.hash}`);
          showToast(`Your NFT has been minted! Check on opensea : https://testnets.opensea.io/assets/goerli/${CONTRACT_ADDRESS}/0`, { type: 'success' });
          setLoading(false);
        }
      } else {
        console.log("Ethereum object doesn't exist!");
        setLoading(false);
      }
    } catch (error) {
      console.log(error)
      if (error.code === -32000) {
        showToast(`You don\'t have sufficient GoerliETH to continue the process, please connect the developer on Twitter for more GoerliETH`, { type: 'failed' });
      } else if (error.code === 4001) {
        showToast(`User rejected the connection requirements`, { type: 'failed' });
      } else {
        console.log(error.message);
        showToast(`Something went wrong or you\'ve exceeded the 3 NFT most limit for each address`, { type: 'failed' });
      }
      setLoading(false);
    }
  }

  const reDirect = async (e: React.SyntheticEvent | Event): Promise<void> => {
    e.preventDefault();
    window.open(`https://testnets.opensea.io/collection/unidentified-contract-2trbficcme`);
  }

  useEffect(
    (): void => {
      checkIfWalletIsConnected()
    }
    , [currentAccounts])

  useEffect((): void => {
    onWidthChange()
  }, [])

  return (
    <div className="h-full flex flex-col justify-center max-w-screen-2xl">
      {/* <AlertInformation handleClose={handleClose} open={open} severity={severity} message={message} /> */}
      <div className='font-TM text-5xl sm:text-6xl md:text-8xl font-bold bg-gradient-custon text-center py-8'>NFT Demo</div>
      <div className='grid grid-cols-1 md:grid-cols-2 text-white'>
        <div className='font-TM text-base sm:text-lg md:text-xl font-normal mx-[10%] 3xl:mx-[20%]'>
          <p className='mb-8'>Each NFT costs 0.08 Goerly ETH and each address can mint 3 NFT at most.</p>
          <p>Don't worry, Goerly ETH is fack money.And if you don't have any Goerly ETH.Find me on Twitter and I shall send you some &lt;3.</p>
        </div>
        <div className='flex flex-col items-center justify-center text-base m-8 lg:m-0 sm:text-lg md:text-xl'>
          {currentAccounts === '' ? <button
            disabled={loading}
            className={`flex items-center bg-[#14F195] border border-black text-black mb-8 py-3.5 px-6 rounded-3xl ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black hover:border-white hover:text-white'}`} onClick={(e): void => { e.preventDefault(); connectWallet() }}>{loading && <ReactLoading type="spin" color="#0F31C8" height={18} width={18} className='mr-1.5' />}Connect Wallet</button> : <button
              className={`flex items-cente bg-gradient-to-r from-bright-green to-bright-blue gradient-animation border border-black text-black mb-8 py-3.5 px-6 rounded-3xl ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black hover:border-white hover:text-white'}`} onClick={(e): void => { e.preventDefault(); askContractToMintNft() }}>{loading && <ReactLoading type="spin" color="#0F31C8" height={18} width={18} className='mr-1.5' />}Mint 1 NFT</button>}
          <button onClick={(e) => { reDirect(e) }} className='hover:bg-[#14F195] border border-white hover:border-black text-white hover:text-black py-3.5 px-6 rounded-3xl'>Check the collection on Opensea</button>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center text-white my-8'>
        {
          currentWidth > 1024 ? <div
            className='flex flex-row'
          >
            <img src={TwitterLogo} className='w-8 h-7 mr-2' />
            <a
              href='https://twitter.com/MaryChao21' className='bg-clip-text text-transparent bg-gradient-to-r from-bright-green hover:from-bright-blue to-bright-blue hover:bg-[#179CF0] gradient-animation text-base sm:text-lg md:text-xl font-normal'>built by @MaryChao21 (or call me Ricy,lol)
            </a> </div> : <div
              className='flex flex-row'
            >
            <img src={TwitterLogo} className='w-8 h-7 mr-2' />
            <a
              href='https://twitter.com/MaryChao21' className='bg-clip-text text-transparent bg-gradient-to-r from-bright-green hover:from-bright-blue to-bright-blue hover:bg-[#179CF0] gradient-animation text-base sm:text-lg md:text-xl font-normal'>built by @MaryChao21
            </a> </div>
        }
        {
          currentWidth < 1024 && <p className='bg-clip-text text-transparent bg-gradient-to-r from-bright-green hover:from-bright-blue to-bright-blue hover:bg-[#179CF0] gradient-animation text-base sm:text-lg md:text-xl font-normal'>(or call me Ricy, lol)</p>
        }
      </div>
    </div>
  )
}

export default SimpleNft;