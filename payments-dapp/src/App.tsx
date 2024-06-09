import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import TransactionHistory from "./components/TransactionHistory";
import PaymentRequestCard from "./components/PaymentRequestCard";
import Rewards from './components/Rewards';
import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { ThirdwebProvider } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";

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
  address: "0x8563A4274dfBA3015fB91C2D46AB19A2372d75E2"
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
  return (
    <>
      <ThirdwebProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={< TransactionHistory />} />
            <Route path="/request" element={< PaymentRequestCard />} />
            <Route path="/rewards" element={< Rewards/>} />
          </Routes>
          </Router>
      </ThirdwebProvider>
    </>
  )
}

