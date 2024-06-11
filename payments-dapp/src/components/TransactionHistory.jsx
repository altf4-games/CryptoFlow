import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
        setTransactions(storedTransactions);
    }, []);

    return (
        <div className="p-4 pb-10 min-h-[100vh] container max-w-screen-lg mx-auto">
        <Card sx={{ maxWidth: 500, margin: 'auto', padding: 1, marginTop: 4 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Transaction History
                </Typography>
                <List>
                    {transactions.map((transaction, index) => (
                        <ListItem key={index} divider>
                            <ListItemText
                                primary={`To: ${transaction.recipient}`}
                                secondary={
                                    <>
                                        <Typography component="span" variant="body2" color="textPrimary">
                                            Amount: {transaction.amount} Eth
                                        </Typography>
                                        <br />
                                        <Typography component="span" variant="body2" color="textPrimary">
                                            Message: {transaction.message}
                                        </Typography>
                                        <br />
                                        <Typography component="span" variant="body2" color="textSecondary">
                                            Date: {new Date(transaction.date).toLocaleString()}
                                        </Typography>
                                        <br />
                                        <Typography component="span" variant="body2" color="textSecondary">
                                            Txn Hash: {transaction.transactionHash}
                                        </Typography>
                                    </>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </CardContent>
            </Card>
        </div>
    );
    
};

export default TransactionHistory;
