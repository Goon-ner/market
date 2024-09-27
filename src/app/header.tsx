import React, { useState, useEffect, FormEvent } from "react";
import { ethers } from "ethers";
import { NavLink } from 'react-router-dom';
import Modal from 'react-modal';
import ConnectWallet from "@/components/ConnectWallet";
import WaitingForTransactionMessage from "../components/WaitingForTransactionMessage";
import TransactionErrorMessage from "../components/TransactionErrorMessage";
import type { NewNFT, NewNFTMarket } from "../typechain/index";
import type { BrowserProvider } from "ethers";


type HeaderProps = {
    currentConnection: CurrentConnectionProps | undefined
    _connectWallet: () => Promise<void>
    networkError: string | undefined
    dismissNet: () => void
    dismissTx: () => void
    _getRpcErrorMessage: (error: any) => string 
    txBeingSent: string | undefined
    handleMintNft: (event: FormEvent<HTMLFormElement>) => Promise<false | undefined>
    transactionError: any
    currentBalance: string | undefined
}

type CurrentConnectionProps = {
    provider: BrowserProvider | undefined;
    newNFT: NewNFT | undefined;
    market: NewNFTMarket | undefined;
    signer: ethers.JsonRpcSigner | undefined;
};


const Header: React.FunctionComponent<HeaderProps> = ({
    currentConnection,
    _connectWallet,
    networkError,
    dismissNet,
    dismissTx,
    txBeingSent,
    handleMintNft,
    transactionError,
    currentBalance
  }): HeaderProps | any => {

    const [mintModal, setMintModal] = useState(false)

    
    const openMint = () => {
      setMintModal(true);
    };
    const closeMint = () => {
      setMintModal(false);
      
    }
    const _onSubmit = (event:FormEvent<HTMLFormElement>) => {
      closeMint()
      handleMintNft(event)
    }

    const _getRpcErrorMessage = (error: any): string => {
      console.log(error);
      if (error.data) {
        return error.data.code;
      }
  
      return error.code;
    };

    const mintModalContent = (
        <div className="modalContent">
          <h2>Mint NFT</h2>
          <form className="modalForm" onSubmit={(event) => _onSubmit(event)}>
            <input type="text" placeholder="Paste image URL" name="tokenUri" />
            <input className="formSubmit" type="submit" value="Mint NFT" />
          </form>
          <button onClick={closeMint}>Close</button>
        </div>
      );

    return (
        <div className="header">
        <NavLink to='/' className="title">
          <h2>Open mind</h2>
          <h3>The easiest way<p>to mint NFT</p></h3>
        </NavLink>
        {currentConnection?.signer && (
          <div className="headerButtons">
            <div>
              <button className="headerMint" onClick={openMint}>Mint NFT</button>
            </div>
            <NavLink to="/account"><button className="headerAcc">My Account</button></NavLink>
          </div>
          )}
        <div className="connect">
          {!currentConnection?.signer && (
            <div>
              <ConnectWallet
              connectWallet={_connectWallet}
              networkError={networkError}
              dismiss={dismissNet}
              />
            </div>
          )}
          {currentConnection?.signer && (
            <p>Your address: {currentConnection.signer.address.slice(0,4)+'...'+currentConnection.signer.address.slice(39,42)}</p>
          )}

          {txBeingSent && <WaitingForTransactionMessage txHash={txBeingSent} />}

          {transactionError && (
            <TransactionErrorMessage
            message={_getRpcErrorMessage(transactionError)}
            dismiss={dismissTx}
            />
          )}

          {currentBalance && (
            <p>Your balance: {Number((ethers.formatEther(currentBalance))).toFixed(4)} POL</p>
          )}
        </div>
        <Modal className="modal" ariaHideApp={false} isOpen={mintModal} onRequestClose={closeMint}>
          {mintModalContent}
        </Modal>
      </div>
    )
}
export default Header