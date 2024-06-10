import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";

const Rewards = () => {
    const abi = [
        "function getPoints() public view returns (uint256)"
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

    return (
        <div>
            <h1>Rewards</h1>
            {userAddress && <p>You have {points.toString()} points</p>}
        </div>
    );
};

export default Rewards;