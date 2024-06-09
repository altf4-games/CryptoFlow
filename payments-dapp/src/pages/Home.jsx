import PaymentCard from "../components/PaymentCard";
import { ConnectButton } from "thirdweb/react";
import { client, wallets } from "../App";
import { baseSepolia } from "thirdweb/chains";

const Home = () => {
    return (
        <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
            <div className="py-20">
                <div className="flex justify-center mb-20">
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
                </div>
                <PaymentCard />
            </div>
        </main>
    )
};

export default Home;