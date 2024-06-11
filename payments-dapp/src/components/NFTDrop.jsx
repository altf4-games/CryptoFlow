import React from 'react';
import { useContract, useNFT } from "@thirdweb-dev/react";
import { MediaRenderer } from 'thirdweb/react';
import { Box, Button, Typography } from '@mui/material';
import { client } from "../App"
import { useActiveAccount } from "thirdweb/react";

const NFTDrop = () => {
    const { contract } = useContract("0x03195b833425BC7016B45b9190A0b62733C68641");
    const { data: nft, isLoading: nftIsLoading } = useNFT(contract, "0");

    const account = useActiveAccount();
    const userAddress = account ? account.address : "";

    const claimNFT = async () => {
        if (userAddress) {
            console.log("User Address: ", userAddress);
            try {
                const tx = await contract.erc1155.claimTo(userAddress, 0, 1);
                console.log("Transaction: ", tx);
            } catch (error) {
                console.error("Error claiming NFT: ", error);
            }
        } else {
            console.error("No user address found.");
        }
    };

    return (
        <>
            {nftIsLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={claimNFT} 
                    >
                        Claim NFT
                    </Button>
                    {nft && (
                        <Box>
                            <MediaRenderer 
                                client={client}
                                src={nft.metadata.image || NFT_sample}
                            />
                            <Typography variant="h4">{nft.metadata.name}</Typography>
                        </Box>
                    )}
                </div>
            )}
        </>
    );
};

export default NFTDrop;
