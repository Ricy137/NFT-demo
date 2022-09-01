import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { AlertColor } from '@mui/material/Alert'
import nftGame from '../../utils/NftGame.json'
import { useAccount } from '../../context/account'
import AlertInformation from '../../components/AlertInformation'
import ConnectButton from '../../components/ConnectButton'
import { transformCharacterData } from '../../utils/constant'
import SelectCharacter from './selectCharacter'

const NftGame = () => {
  const [characterNFT, setCharacterNFT] = useState<GameCharacterData>();
  const [open, setOpen] = useState<boolean>(false);
  const [severity, setSeverity] = useState<AlertColor>('info');
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { accounts, isLogin } = useAccount();
  const CONTRACT_ADDRESS = '0x7763037183e18dBf6f968920bFa54812b4553005';
  const GOERLI_CHAIN_ID = "0x5";

  useEffect(() => {
    const fetchNFTMetadata = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const gameContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          nftGame.abi,
          signer
        );
        const txn = await gameContract.checkIfUserHasNFT();
        if (txn.name) {
          console.log('User has character NFT');
          setCharacterNFT(transformCharacterData(txn));
        } else {
          console.log('No character NFT found');
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false);
      }
    }
    if (!isLogin || window.ethereum.networkVersion !== '4') {
      setIsLoading(false);
      return;
    }
    fetchNFTMetadata();
  }, [accounts]);
  return (
    <div className="h-full flex flex-col justify-center items-center max-w-screen-2xl">
      <div className='font-TM text-5xl sm:text-6xl md:text-8xl font-bold bg-gradient-custon text-center py-8'>
        {/* NFT GAME */}
        Features coming soon
      </div>
      <div className='flex flex-row items-center'>
        <img className="w-9 h-9" src="https://pbs.twimg.com/profile_images/1154798570047967233/ZINt8NSB_400x400.jpg" alt="Tornado" />
        <span className='font-TM text-base sm:text-lg md:text-xl font-normal text-white'>Let's team up to join the metaverse protection.</span>
        <img className="w-9 h-9" src="https://pbs.twimg.com/profile_images/1154798570047967233/ZINt8NSB_400x400.jpg" alt="Tornado" />
      </div>
      {/* {!isLogin && <ConnectButton setOpen={setOpen} setSeverity={setSeverity} setMessage={setMessage} />}
      {isLogin && (!characterNFT || characterNFT.hp <= 0) && <SelectCharacter setCharacterNFT={setCharacterNFT} />} */}
    </div>
  )
}
export default NftGame;