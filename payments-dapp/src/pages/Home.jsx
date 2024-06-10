import PaymentCard from "../components/PaymentCard";

const Home = () => {
    return (
        <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
            <div className="py-20">
                <div className="flex justify-center mb-20">
                </div>
                <PaymentCard />
            </div>
        </main>
    )
};

export default Home;