import { MetaMaskInpageProvider } from '@metamask/providers'

declare module '*.png'
declare module '*.svg'
declare module '*.jpeg'
declare module '*.jpg'
declare module '*.json' {
  const value: any
  export default value
}

declare global {
  interface Window {
    ethereum: any
    screenWidth: number
  }

  interface AccountCtx {
    accounts: string[]
    isLogin: boolean
    setAccounts: React.Dispatch<React.SetStateAction<string[]>>
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
  }

  interface GameCharacterData {
    name: any
    imageURI: any
    hp: any
    maxHp: any
    attackDamage: any
  }
}
export {}
