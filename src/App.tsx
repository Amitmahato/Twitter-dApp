import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Web3AuthCore } from "@web3auth/core";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { TorusWalletConnectorPlugin } from "@web3auth/torus-wallet-connector-plugin";

const clientId = process.env.REACT_APP_WEB3_AUTH_CLIENT_ID || "";

const web3auth = new Web3AuthCore({
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x13881",
    rpcTarget:
      "https://sleek-rough-uranium.matic-testnet.discover.quiknode.pro/c7c16b97e7b45a469878ee260ad13a130010e26d/",
  },
  clientId,
});

const openloginAdapter = new OpenloginAdapter({
  adapterSettings: {
    clientId,
    network: "testnet",
    uxMode: "popup",
    whiteLabel: {
      name: "Twitter DApp",
      defaultLanguage: "en",
      dark: true, // whether to enable dark mode. defaultValue: false
    },
    loginConfig: {
      // Add login configs corresponding to the providers on modal
      // Twitter login
      jwt: {
        name: "Twitter DApp Login",
        verifier: "TwitterDapp-TestNet", // Please create a verifier on the developer dashboard and pass the name here
        typeOfLogin: "twitter", // Pass on the login provider of the verifier you've created
        clientId, // Pass on the clientId of the login provider here - Please note this differs from the Web3Auth ClientID. This is the JWT Client ID
      },
    },
  },
});

web3auth.configureAdapter(openloginAdapter);

const torusPlugin = new TorusWalletConnectorPlugin({
  torusWalletOpts: {},
  walletInitOptions: {
    whiteLabel: {
      theme: { isDark: true, colors: { primary: "#00a8ff" } },
      logoDark: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      logoLight: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    },
    useWalletConnect: true,
    enableLogging: true,
  },
});

web3auth.addPlugin(torusPlugin);

web3auth.init();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
