import React from 'react';
import PaymentCard from "../components/PaymentCard";
import { Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import gradient from "../assets/gradient.jpg";
import { useActiveAccount } from "thirdweb/react";

const Home = () => {
    const account = useActiveAccount();
    const address = account?.address.toString().split("").map((char, index) => index < 6 || index > 34 ? char : "*").join("");
    return (
        <main className="p-4 pb-10 min-h-[100vh] container max-w-screen-lg mx-auto">
            {/* Hero Section */}
            <section className="mb-10">
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Typography variant="h2" component="h1" gutterBottom>
                            Welcome to Your Payment Dapp
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Make secure and convenient payments with ease.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Use gasless transactions, earn loyalty points, and exchange them for NFTs.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Built on Base, your transactions are secure and reliable.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ maxWidth: 400 }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={gradient}
                                alt="Credit Card Illustration"
                            />
                            <Typography  component="p" gutterBottom className="text-right">
                                {address}
                            </Typography>
                        </Card>
                    </Grid>
                </Grid>
            </section>
            
            {/* Payment Card Section */}
            <section>
                <Typography variant="h4" component="h2" gutterBottom className="text-white py-4 text-center w-full">
                    Make a Payment
                </Typography>
                <PaymentCard />
            </section>

            {/* Features Section */}
        <section className="mt-10">
            <Typography variant="h4" component="h2" gutterBottom className='text-center'> 
                Features
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card className="h-full flex flex-col">
                        <CardContent className="flex-grow">
                            <Typography variant="h6" gutterBottom>
                                Gasless Transactions
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Make transactions without worrying about gas fees.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card className="h-full flex flex-col">
                        <CardContent className="flex-grow">
                            <Typography variant="h6" gutterBottom>
                                Earn Points
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Earn loyalty points with each transaction.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card className="h-full flex flex-col">
                        <CardContent className="flex-grow">
                            <Typography variant="h6" gutterBottom>
                                Use Points for NFTs
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Exchange points for exclusive NFTs.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card className="h-full flex flex-col">
                        <CardContent className="flex-grow">
                            <Typography variant="h6" gutterBottom>
                                Secure
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Built on Base, ensuring the security of your transactions.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </section>
        </main>
    )
};

export default Home;
