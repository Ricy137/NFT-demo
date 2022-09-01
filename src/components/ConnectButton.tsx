import React, { useEffect, useState } from 'react';
import { AlertColor } from '@mui/material/Alert';
import ReactLoading from "react-loading";
import { useAccount } from '../context/account';

const ConnectButton = ({ setOpen, setSeverity, setMessage }: { setOpen: React.Dispatch<React.SetStateAction<boolean>>, setSeverity: React.Dispatch<React.SetStateAction<AlertColor>>, setMessage: React.Dispatch<React.SetStateAction<string>> }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setAccounts, setIsLogin } = useAccount();

  const connectWallet = async (): Promise<void> => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        setOpen(true);
        setSeverity('error');
        setMessage('Please install metamask first');
        return
      }
      let chainId = await ethereum.request({ method: 'eth_chainId' });
      console.log("Connected to chain " + chainId);
      if (chainId !== "0x5") {
        setOpen(true);
        setSeverity('error');
        setMessage('You are not connected to Goerli Test Network.');
        return
      }
      setLoading(true);
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts && accounts !== undefined && accounts !== null && accounts[0]) {
        setAccounts(accounts)
        setIsLogin(true);
        // setupEventListener() 
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <button
      disabled={loading}
      className={`flex items-center bg-[#14F195] border border-black text-black mb-8 py-3.5 px-6 rounded-3xl ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black hover:border-white hover:text-white'}`} onClick={(e): void => { e.preventDefault(); connectWallet() }}>{loading && <ReactLoading type="spin" color="#0F31C8" height={18} width={18} className='mr-1.5' />}Connect Wallet</button>
  )
}

export default ConnectButton;