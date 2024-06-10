import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { Box, Button, Typography, Container } from '@mui/material';

const Rewards = () => {
    const abi = [
        "function getPoints() public view returns (uint256)",
        "function claimNFT() public"
    ];

    const [points, setPoints] = useState(0);
    const contractAddress = '0xa9db450D528e68121E6059666bdEa061Be8B0F92';
    const provider = new ethers.providers.JsonRpcProvider('https://sepolia.base.org');
    const account = useActiveAccount();
    const userAddress = account ? account.address : null;

    useEffect(() => {
        async function getPoints() {    
            const contract = new ethers.Contract(contractAddress, abi, provider);
            
            try {
                if (userAddress) {
                    const pts = await contract.getPoints({ from: userAddress });
                    setPoints(pts);
                    console.log(`User has ${pts.toString()} points`);
                }
            } catch (error) {
                console.error('Error getting points:', error);
            }
        }

        if (account) {
            getPoints(); 
            const intervalId = setInterval(getPoints, 30000);
            return () => clearInterval(intervalId);
        }
    }, [account]);

    const claimNFT = async () => {
        console.log('Claiming NFT...');
    };

    return (
        <Container maxWidth="sm">
            <Box 
                sx={{ 
                    bgcolor: 'background.paper', 
                    boxShadow: 1, 
                    borderRadius: 2, 
                    p: 2, 
                    minWidth: 300,
                    textAlign: 'center',
                    mt: 5
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Rewards
                </Typography>
                {userAddress && (
                    <Typography variant="body1" gutterBottom>
                        You have {points.toString()} points
                    </Typography>
                )}
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={claimNFT} 
                    disabled={!userAddress}
                >
                    Claim NFT
                </Button>
            </Box>
        </Container>
    );
};

export default Rewards;
