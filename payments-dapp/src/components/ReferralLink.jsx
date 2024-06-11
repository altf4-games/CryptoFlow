import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (account) {
      generateReferralLink();
    }
  }, [account]);

  return (
    <div className="p-4 pb-10 min-h-[100vh] container max-w-screen-lg mx-auto">
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
              <div className="flex justify-center items-center">
                <QRCode value={referralCode} size={200} />
              </div>

            </Box>
          </Container>
        )}
      </Box>
      </Container>
    </div>
  );
};

export default ReferralLink;
