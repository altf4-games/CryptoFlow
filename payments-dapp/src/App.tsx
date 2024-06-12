import * as React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from "./pages/Home";
import TransactionHistory from "./components/TransactionHistory";
import PaymentRequestCard from "./components/PaymentRequestCard";
import Rewards from './components/Rewards';
import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain, baseSepolia } from "thirdweb/chains";
import { ConnectButton } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { ThirdwebProvider } from 'thirdweb/react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Container, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Footer from './components/Footer';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import RedeemIcon from '@mui/icons-material/Redeem';

export const client = createThirdwebClient({ 
  clientId: "212a258f698fe1ccfa55047b44fb91fe" 
});

export const contract = getContract({ 
  client, 
  chain: defineChain(84532), 
  address: "0x2AE33D05eF86488077d0B3CFc66FEf98De56e565"
});

export const loyalty_contract = getContract({ 
  client, 
  chain: defineChain(84532), 
  address: "0xa9db450D528e68121E6059666bdEa061Be8B0F92"
});

export const nft_contract = getContract({ 
  client, 
  chain: defineChain(84532), 
  address: "0x03195b833425BC7016B45b9190A0b62733C68641"
});

export const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  inAppWallet({
    auth: {
      options: [
        "email",
        "google",
        "apple",
        "facebook",
        "phone",
      ],
    },
  }),
];

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#000000',
      paper: '#121212',
    },
    text: {
      primary: '#ffffff',
    },
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" style={{ background: '#0d0d0d' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            CryptoFlow
          </Typography>
          <div>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} component={Link} to="/">Home</MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/history">Transaction History</MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/request">Payment Request</MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/rewards">Rewards</MenuItem>
            </Menu>
          </div>
          <ConnectButton
            client={client}
            wallets={wallets}
            accountAbstraction={{
              chain: baseSepolia,
              factoryAddress: "0x0Bbf1987E008C1D4c6ecF199Be3F553324ab7652",
              gasless: true,
            }}
            theme={"dark"}
            connectModal={{ size: "compact" }}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

function FloatingDock() {
  const [value, setValue] = React.useState(0);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
      >
        <BottomNavigationAction component={Link} to="/" label="Pay" icon={<HomeIcon />} />
        <BottomNavigationAction component={Link} to="/request" label="Request" icon={<RequestPageIcon />} />
        <BottomNavigationAction component={Link} to="/history" label="History" icon={<HistoryIcon />} />
        <BottomNavigationAction component={Link} to="/rewards" label="Rewards" icon={<RedeemIcon />} />
      </BottomNavigation>
    </Paper>
  );
}

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <ThirdwebProvider>
        <Router>
          <Navbar />
          <div className="min-h-screen bg-black text-white">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/history" element={<TransactionHistory />} />
              <Route path="/request" element={<PaymentRequestCard />} />
              <Route path="/rewards" element={<Rewards />} />
            </Routes>
            <Footer />
          </div>
          <FloatingDock />
        </Router>
      </ThirdwebProvider>
    </ThemeProvider>
  )
}
