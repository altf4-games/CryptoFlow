import React, { useState } from 'react';
import { Card, CardContent, TextField, Typography, Button } from '@mui/material';
import { prepareContractCall, resolveMethod, toWei } from "thirdweb"
import { useSendTransaction } from "thirdweb/react";
import { contract } from "../App";

const PaymentCard = () => {
    const { mutate: sendTransaction, isLoading, isError } = useSendTransaction();

    const handleClick = async () => {
        try {
            const transaction = await prepareContractCall({ 
                contract, 
                method: resolveMethod("pay"), 
                params: [message, recipient],
                value: BigInt(toWei(amount, "ether").toString()),
            });
            const transactionHash = await sendTransaction(transaction);
            
            const transactionDetails = {
                recipient,
                amount,
                message,
                transactionHash,
                date: new Date().toISOString(),
            };

            const existingTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
            existingTransactions.push(transactionDetails);
            localStorage.setItem('transactions', JSON.stringify(existingTransactions));
            
            console.log(transaction.blockExplorers.apiUrl);
        } catch (error) {
            console.error('Transaction failed', error);
        }
    };
    
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const handleRecipientChange = (e) => setRecipient(e.target.value);
    const handleAmountChange = (e) => setAmount(e.target.value);
    const handleMessageChange = (e) => setMessage(e.target.value);

    return (
        <Card sx={{ maxWidth: 500, margin: 'auto', padding: 2}}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Payment Details
                </Typography>
                <TextField
                    label="To"
                    variant="outlined"
                    value={recipient}
                    onChange={handleRecipientChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Amount (Eth)"
                    variant="outlined"
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Enter Message"
                    variant="outlined"
                    value={message}
                    onChange={handleMessageChange}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" color="primary" onClick={handleClick}>
                    Send Payment
                </Button>
            </CardContent>
        </Card>
    );
};

export default PaymentCard;
