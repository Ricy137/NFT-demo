import { MetaMaskInpageProvider } from "@metamask/providers";

declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";
declare module "*.json" {
  const value: any;
  export default value;
}
declare global {
  interface Window {
    ethereum: any;
  }
}
export {};