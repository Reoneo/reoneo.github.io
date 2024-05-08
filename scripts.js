// Include the necessary libraries with import statements
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

// Provider options setup
const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider, // the package
        options: {
            infuraId: "YOUR_INFURA_ID" // replace with your Infura ID
        }
    }
};

const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional but recommended; uses localStorage to remember the user's choice
    providerOptions // required
});

// Connect Wallet function
async function connectWallet() {
    try {
        const provider = await web3Modal.connect(); // this will open the modal to connect a wallet
        const web3 = new Web3(provider); // create a Web3 instance

        // Subscribe to accounts change
        provider.on("accountsChanged", (accounts) => {
            console.log('Accounts changed:', accounts);
            document.getElementById("connectWallet").innerText = `Wallet Connected: ${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`;
        });

        // Subscribe to chain changes
        provider.on("chainChanged", (chainId) => {
            console.log('Chain changed:', chainId);
            window.location.reload();
        });

        // Subscribe to provider connection
        provider.on("connect", (info) => {
            console.log('Connected:', info);
        });

        // Subscribe to provider disconnection
        provider.on("disconnect", (error) => {
            console.log('Disconnected:', error);
            document.getElementById("connectWallet").innerText = "Connect Wallet";
        });

        // Get accounts on page load
        const accounts = await web3.eth.getAccounts();
        document.getElementById("connectWallet").innerText = `Wallet Connected: ${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`;

    } catch (error) {
        console.error("Could not connect to wallet:", error);
        document.getElementById("connectWallet").innerText = "Connect Wallet";
    }
}

// Add event listener to the button
document.getElementById('connectWallet').addEventListener('click', connectWallet);
