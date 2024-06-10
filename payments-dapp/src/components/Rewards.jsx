import { prepareContractCall, resolveMethod } from "thirdweb"
import { useSendTransaction } from "thirdweb/react";
import { client } from "../App"
import { getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { useReadContract } from "thirdweb/react";


const Rewards = () => {
    const { mutate: sendTransaction, isLoading, isError } = useSendTransaction();
    const _points = 300;

    if(!client) return null;
        const contract = getContract({ 
            client, 
            chain: defineChain(84532), 
            address: "0xa9db450D528e68121E6059666bdEa061Be8B0F92"
        });

      const { data, isLoading2 } = useReadContract({ 
            contract, 
            method: resolveMethod("getPoints"), 
            params: [] 
      });
    
    
    const handleClaim = async () => {
        try {
        const transaction = await prepareContractCall({ 
            contract, 
            method: resolveMethod("addPoints"), 
            params: [_points],
        });
            const transactionHash = await sendTransaction(transaction);
            console.log(transactionHash);
        }catch (error) {
            console.error(error);
        }

    };

    return (
        <div>
            <h1>Rewards</h1>
            <button onClick={handleClaim}>Claim</button>
            <p>Points: {data}</p>
        </div>
    )
}

export default Rewards;