import React, { useState } from 'react';

const PaymentCard = () => {
    const [address, setAddress] = useState();
    const [amount, setAmount] = useState();
    const [message, setMessage] = useState();
    
    return (
        <div className="payment-card">
            <input type="address" placeholder="To" value={address} />
            <input type="number" placeholder="0.50 Eth" value={amount} />
            <input type="text" placeholder="Enter Message" value={message} />
        </div>
    );
};

export default PaymentCard;
    
