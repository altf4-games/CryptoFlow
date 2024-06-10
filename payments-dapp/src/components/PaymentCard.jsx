import React, { useState, useEffect } from 'react';
import { Card, CardContent, TextField, Typography, Button } from '@mui/material';
import { prepareContractCall, resolveMethod, toWei } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { contract, loyalty_contract } from "../App";
import { useLocation } from 'react-router-dom';

const PaymentCard = () => {
    const { mutate: sendTransaction, isLoading, isError } = useSendTransaction();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const pointsToIncrease = 10;

    const [recipient, setRecipient] = useState(searchParams.get('recipient') || '');
    const [amount, setAmount] = useState(searchParams.get('amount') || '');
    const [message, setMessage] = useState('');
    const [isLocked, setIsLocked] = useState(Boolean(searchParams.get('recipient') && searchParams.get('amount')));

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

            setIsLocked(false);

            const tx = await prepareContractCall({ 
                contract: loyalty_contract, 
                method: resolveMethod("addPoints"), 
                params: [pointsToIncrease] 
            });
            const txHash = await sendTransaction(tx);
            
        } catch (error) {
            console.error('Transaction failed', error);
        }
    };

    const handleRecipientChange = (e) => setRecipient(e.target.value);
    const handleAmountChange = (e) => setAmount(e.target.value);
    const handleMessageChange = (e) => setMessage(e.target.value);

    return (
        <Card sx={{ maxWidth: 500, margin: 'auto', padding: 2 }}>
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
                    disabled={isLocked}
                />
                <TextField
                    label="Amount (Eth)"
                    variant="outlined"
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    fullWidth
                    margin="normal"
                    disabled={isLocked}
                />
                <TextField
                    label="Enter Message"
                    variant="outlined"
                    value={message}
                    onChange={handleMessageChange}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" color="primary" onClick={handleClick} disabled={isLoading}>
                    Send Payment
                </Button>
            </CardContent>
        </Card>
    );
};

export default PaymentCard;
