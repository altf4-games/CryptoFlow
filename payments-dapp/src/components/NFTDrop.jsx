import React from 'react';
import { Box, Button, Typography } from '@mui/material'; 
import { useContract, useNFT } from "@thirdweb-dev/react";
import { useActiveAccount, useSendTransaction, MediaRenderer } from "thirdweb/react";
import { prepareContractCall, resolveMethod } from "thirdweb";
import { loyalty_contract, client } from "../App"

const NFTDrop = () => {
    const pointsToDecrease = 100;
    const { mutate: sendTransaction, isLoading, isError } = useSendTransaction();

    const { contract } = useContract("0x03195b833425BC7016B45b9190A0b62733C68641");;
    const { data: nft, isLoading: nftIsLoading } = useNFT(contract, 0);
    const account = useActiveAccount();
    const userAddress = account ? account.address : "";

    const claimNFT = async () => {
        if (userAddress) {
            try {
                const transaction = await prepareContractCall({ 
                    contract: loyalty_contract, 
                    method: resolveMethod("redeemPoints"), 
                    params: [pointsToDecrease] 
                });
                const txHash = await sendTransaction(transaction);

                const tx = await contract.erc1155.claimTo(userAddress, 0, 1);
                console.log("Transaction: ", tx.receipt.transactionHash);

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
                                src={nft.metadata.image}
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
