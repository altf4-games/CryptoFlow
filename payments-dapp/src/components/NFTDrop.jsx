import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material'; 
import { useActiveAccount, useSendTransaction, MediaRenderer } from "thirdweb/react";
import { prepareContractCall, resolveMethod } from "thirdweb";
import { loyalty_contract, nft_contract, client } from "../App"
import { claimTo } from "thirdweb/extensions/erc1155";
import { getNFT } from "thirdweb/extensions/erc1155";

const tokenID = Math.floor(Math.random() * 10);
const claimPrice = 100;

const NFTDrop = ({points}) => {
    const { mutate: sendTransaction, isLoading, isError } = useSendTransaction();

    const [nft, setNft] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const nftData = await getNFT({
                    contract: nft_contract,
                    tokenId: BigInt(tokenID),
                });
                setNft(nftData);
            } catch (error) {
                console.error("Error fetching NFT data:", error);
                // Handle error as needed
            }
        };

        fetchData();
        
    }, []);

    const account = useActiveAccount();
    const userAddress = account ? account.address : "";

    const claimNFT = async () => {
        if (userAddress && points >= claimPrice) {
            try {
                const transaction = await prepareContractCall({ 
                    contract: loyalty_contract, 
                    method: resolveMethod("redeemPoints"), 
                    params: [claimPrice] 
                });
                const txHash = await sendTransaction(transaction);

                const tx = await claimTo({
                    contract: nft_contract,
                    to: userAddress,
                    tokenId: BigInt(tokenID),
                    quantity: 1n,
                });
                const tHash = await sendTransaction(tx);

            } catch (error) {
                console.error("Error claiming NFT: ", error);
            }
        } else {
            console.error("No user address found.");
        }
    };

    return (
        <>
            {nft === null ? (
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
                    {nft !== null && (
                            <Box>
                            <div className="flex justify-center items-center mt-5">
                                <MediaRenderer 
                                    client={client}
                                    src={nft.metadata.image}
                                />
                            </div>
                            <Typography variant="h4" className='mt-10'>{nft.metadata.name}</Typography>
                        </Box>
                    )}
                </div>
            )}
        </>
    );
};

export default NFTDrop;
