import React, { useState } from 'react';
import { Card, CardContent, TextField, Typography, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';

const PaymentRequestCard = () => {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [link, setLink] = useState('');

    const handleRecipientChange = (e) => setRecipient(e.target.value);
    const handleAmountChange = (e) => setAmount(e.target.value);

    const generateLink = () => {
        const baseUrl = window.location.origin;
        const paymentLink = `${baseUrl}?recipient=${encodeURIComponent(recipient)}&amount=${encodeURIComponent(amount)}`;
        setLink(paymentLink);
    };

    return (
        <Card sx={{ maxWidth: 500, margin: 'auto', padding: 2}}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Create Payment Request
                </Typography>
                <TextField
                    label="Recipient Address"
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
                <Button variant="contained" color="primary" onClick={generateLink}>
                    Generate Link
                </Button>
                {link && (
                    <Typography variant="body2" marginTop={2}>
                        Share this link: <a href={link}>{link}</a>
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default PaymentRequestCard;
