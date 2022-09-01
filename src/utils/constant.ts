const GAME_CONTRACT_ADDRESS = '0x5b3DD1ed86B3128b4709C2dA3C278Ed0d8A59Cf5'

const transformCharacterData = (characterData) => {
  return {
    name: characterData.name,
    imageURI: characterData.imageURI,
    hp: characterData.hp.toNumber(),
    maxHp: characterData.maxHp.toNumber(),
    attackDamage: characterData.attackDamage.toNumber()
  }
}

export { GAME_CONTRACT_ADDRESS, transformCharacterData }
