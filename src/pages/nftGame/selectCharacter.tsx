import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import nftGame from '../../utils/NftGame.json'
import { GAME_CONTRACT_ADDRESS, transformCharacterData } from '../../utils/constant';

const SelectCharacter = ({ setCharacterNFT }) => {
  const [characters, setCharacters] = useState<GameCharacterData[]>([]);
  const [gameContract, setGameContract] = useState<ethers.Contract>();//TODO: add interface
  const [mintingCharacter, setMintingCharacter] = useState(false);

  const mintCharacterNFTAction = async (characterId) => {
    try {
      if (gameContract) {
        setMintingCharacter(true);
        console.log('Minting character in progress...');
        const mintTxn = await gameContract.mintCharacterNFT(characterId);
        await mintTxn.wait();
        console.log('mintTxn:', mintTxn);
      }
    } catch (error) {
      console.warn('MintCharacterAction Error:', error)
    } finally {
      setMintingCharacter(false);
    }
  };

  useEffect(() => {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const gameContract = new ethers.Contract(
        GAME_CONTRACT_ADDRESS,
        nftGame.abi,
        signer
      );
      setGameContract(gameContract);
    } else {
      console.log('Ethereum object not found');
    }
  }, []);

  useEffect(
    () => {
      const getCharacters = async () => {
        try {
          if (!gameContract) { return }
          const charactersTxn = await gameContract.getAllDefaultCharacters();
          const tempCharacters = charactersTxn.map(characterData =>
            transformCharacterData(characterData)
          );
          console.log('tem', tempCharacters);
          await setCharacters(tempCharacters);
        } catch (error) {
          console.error('Something went wrong fetching characters:', error);
        }
      };
      const onCharacterMint = async (sender, tokenId, characterIndex) => {
        console.log(
          `CharacterNFTMinted - sender: ${sender} tokenId: ${tokenId.toNumber()} characterIndex: ${characterIndex.toNumber()}`
        );
        if (gameContract) {
          const characterNFT = await gameContract.checkIfUserHasNFT();
          console.log('CharacterNFT: ', characterNFT);
          setCharacterNFT(transformCharacterData(characterNFT));
        }
      };
      if (gameContract) {
        getCharacters();
        gameContract.on('CharacterNFTMinted', onCharacterMint);
      }
      return () => {
        if (gameContract) {
          gameContract.off('CharacterNFTMinted', onCharacterMint);
        }
      };
    },
    [gameContract]
  );

  return (
    <div className="text-white">
      <h2>Mint Your Hero. Choose wisely.</h2>
      {characters.length > 0 && (
        <div className="flex flex-row">
          {characters.map((character, index) => {
            return (
              <div key={character.name}>
                <div >
                  <p>{character.name}</p>
                </div>
                <img className='w-9 h-9' src={character.imageURI} alt={character.name} />
                <button
                  type="button"
                  className="character-mint-button"
                  onClick={() => mintCharacterNFTAction(index)}
                >{`Mint ${character.name}`}</button>
              </div>
            );
          })}
          {
            mintingCharacter && (
              <div className="loading">
                <div className="indicator">
                  {/* <LoadingIndicator /> */}
                  <p>Minting In Progress...</p>
                </div>
                <img
                  src="https://media2.giphy.com/media/61tYloUgq1eOk/giphy.gif?cid=ecf05e47dg95zbpabxhmhaksvoy8h526f96k4em0ndvx078s&rid=giphy.gif&ct=g"
                  alt="Minting loading indicator"
                />
              </div>
            )
          }
        </div>
      )}
    </div>
  );
}

export default SelectCharacter;