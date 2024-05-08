// Configuring Web3modal to connect to different wallets
const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider, // required
        options: {
            infuraId: "YOUR_INFURA_ID" // Replace with your Infura ID
        }
    }
};

const web3Modal = new Web3Modal({
    cacheProvider: false, 
    providerOptions 
});

async function connectWallet() {
    try {
        const provider = await web3Modal.connect();
        const web3 = new Web3(provider);

        provider.on("accountsChanged", (accounts) => {
            document.getElementById("connectWallet").innerText = `Wallet Connected: ${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`;
        });

        provider.on("chainChanged", (chainId) => {
            window.location.reload();
        });

        const accounts = await web3.eth.getAccounts();
        document.getElementById("connectWallet").innerText = `Wallet Connected: ${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`;
    } catch (error) {
        console.error("
