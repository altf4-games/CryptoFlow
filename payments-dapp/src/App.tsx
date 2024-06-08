import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import { createThirdwebClient, getContract, resolveMethod } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { ThirdwebProvider } from "thirdweb/react";

export const client = createThirdwebClient({ 
  clientId: "212a258f698fe1ccfa55047b44fb91fe" 
});

export const contract = getContract({ 
  client, 
  chain: defineChain(84532), 
  address: "0x2AE33D05eF86488077d0B3CFc66FEf98De56e565"
});

export function App() {
  return (
    <>
      <ThirdwebProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          </Router>
      </ThirdwebProvider>
    </>
  )
}

