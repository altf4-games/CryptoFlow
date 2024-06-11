import React, { useState } from 'react';
import { useActiveAccount } from 'thirdweb/react';
import { Button, Container, Typography, TextField, Box } from '@mui/material';
import QRCode from 'qrcode.react';

const ReferralLink = () => {
  const [referralCode, setReferralCode] = useState('');
  const account = useActiveAccount();
  const userAddress = account ? account.address : null;
  
  const generateReferralLink = () => {
    const referralLink = `${window.location.origin}/?ref=${userAddress}`;
    setReferralCode(referralLink);
  };

  return (
    <Container>
      <Box 
        sx={{ 
            bgcolor: 'background.paper', 
            boxShadow: 1, 
            borderRadius: 2, 
            p: 2, 
            minWidth: 300,
            textAlign: 'center',
            mt: 5
        }}
      >
        <Typography variant="h4" gutterBottom>
          Generate Referral Link
        </Typography>
        <Button variant="contained" color="primary" onClick={generateReferralLink}>
          Generate Link
        </Button>
        {referralCode && (
          <Container sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Your Referral Link:
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={referralCode}
              InputProps={{
                readOnly: true,
              }}
            />
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <QRCode value={referralCode} />
            </Box>
          </Container>
        )}
      </Box>
    </Container>
  );
};

export default ReferralLink;
