// Import statements or script tags are necessary depending on your setup

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider, // the WalletConnectProvider variable needs to be defined if this line errors
        options: {
            infuraId: "YOUR_INFURA_ID" // Replace this with your Infura Project ID
        }
    }
};

const web3Modal = new Web3Modal({
    network: "mainnet", // Optional
    cacheProvider: true, // Recommended to turn off for development
    providerOptions // necessary
});

async function connectWallet() {
    try {
        const provider = await web3Modal.connect();
        const web3 = new Web3(provider);

        provider.on("accountsChanged", (accounts) => {
            document.getElementById("connectWallet").innerText = `Connected: ${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`;
        });

        provider.on("chainChanged", (chainId) => {
            window.location.reload();
        });

        provider.on("disconnect", (error) =>
