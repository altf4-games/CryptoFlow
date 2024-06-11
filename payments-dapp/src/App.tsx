import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import TransactionHistory from "./components/TransactionHistory";
import PaymentRequestCard from "./components/PaymentRequestCard";
import Rewards from './components/Rewards';
import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain, baseSepolia } from "thirdweb/chains";
import { ThirdwebProvider, ConnectButton } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { ThirdwebSDKProvider as Provider } from '@thirdweb-dev/react';
import { BaseSepoliaTestnet } from "@thirdweb-dev/chains";
import { ethers } from "ethers";

export const client = createThirdwebClient({ 
  clientId: "212a258f698fe1ccfa55047b44fb91fe" 
});

export const contract = getContract({ 
  client, 
  chain: defineChain(84532), 
  address: "0x2AE33D05eF86488077d0B3CFc66FEf98De56e565"
});

export const loyalty_contract = getContract({ 
  client, 
  chain: defineChain(84532), 
  address: "0xa9db450D528e68121E6059666bdEa061Be8B0F92"
});

export const nft_contract = getContract({ 
  client, 
  chain: defineChain(84532), 
  address: "0x03195b833425BC7016B45b9190A0b62733C68641"
});

export const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  inAppWallet({
    auth: {
      options: [
        "email",
        "google",
        "apple",
        "facebook",
        "phone",
      ],
    },
  }),
];

export function App() {
  const signer = new ethers.providers.Web3Provider(
    window.ethereum,
  ).getSigner();

  return (
    <>
      <ThirdwebProvider>
        <Provider
          activeChain={BaseSepoliaTestnet}
          clientId="212a258f698fe1ccfa55047b44fb91fe"
          signer={signer}
        >

        <ConnectButton
          client={client}
          wallets={wallets}
          accountAbstraction={{
              chain: baseSepolia,
              factoryAddress: "0x0Bbf1987E008C1D4c6ecF199Be3F553324ab7652",
              gasless: true,
          }}
          theme={"dark"}
          connectModal={{ size: "wide" }}
        />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={< TransactionHistory />} />
            <Route path="/request" element={< PaymentRequestCard />} />
            <Route path="/rewards" element={< Rewards/>} />
          </Routes>
          </Router>
                    
        </Provider>
      </ThirdwebProvider>
    </>
  )
}

