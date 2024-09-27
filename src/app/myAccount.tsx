import React, { useState, FormEvent } from "react";
import { ethers } from "ethers";
import Modal from 'react-modal';
import type { NewNFT, NewNFTMarket } from "@/typechain";
import type { BrowserProvider } from "ethers";




type MyAccountProps = {
    currentConnection: CurrentConnectionProps | undefined
    nftList: nftType[]
    handleAddNFT: (event: FormEvent<HTMLFormElement>) => Promise<false | undefined>
    filterNftList: (token: string) => Promise<false | undefined>
    _tokenUri: (tokenId: number) => Promise<string>
    accountNft: {tokenId:string, tokenUri:string}[]
}
type nftType = {tokenId:string, tokenPrice:string}
type CurrentConnectionProps = {
    provider: BrowserProvider | undefined;
    newNFT: NewNFT | undefined;
    market: NewNFTMarket | undefined;
    signer: ethers.JsonRpcSigner | undefined;
};


const MyAccount: React.FunctionComponent<MyAccountProps> = ({
    nftList, 
    handleAddNFT, 
    filterNftList,
    accountNft
}): MyAccountProps | any => {

    const [modal, setModal] = useState({uri:'', id:'', bool:false})
   
    
    const openSellModal = (uri:string, id:string) => {
      setModal({uri: uri, id: id, bool:true})
    };
    const closeSellModal = () => {
      setModal({uri:'', id:'', bool:false});
    }
    const _onSubmit = (event:FormEvent<HTMLFormElement>) => {
      closeSellModal()
      handleAddNFT(event)
    }

    function alreadyOnSale(id:string, list:nftType[]) {
      let i;
      for (i = 0; i < list.length; i++) {
          if (list[i]['tokenId'] === id) {
              return true;
          }
      }
  
      return false;
  }

    const modalSell = (
        <div className="modalContent">
          <h2>Sell NFT</h2>
          <form className="modalForm" onSubmit={(event) => _onSubmit(event)}>
            <img src={modal.uri} alt={modal.id} className="modalImg"/>
            <h3>NFT{modal.id}</h3>
            <input type="value" value={modal.id} name="tokenId" onChange ={()=>{}} />
            <input type="text" placeholder="Price" name="tokenPrice" />
            <input className="formSubmit" type="submit" value="Sell NFT" />
          </form>
          <button onClick={closeSellModal}>Close</button>
        </div>
    )

    return (
    <div className="accountNft">
          {accountNft.length > 0 ?
          accountNft.map((obj:{tokenId:string, tokenUri:string}) => 
              <div key={obj.tokenId} className="nft">
                  <img src={obj.tokenUri} alt={obj.tokenId}/>
                  <div className="nftDescription">
                    <h3>Happy NFT {obj.tokenId}</h3>
                    {nftList.length > 0 && alreadyOnSale(obj.tokenId, nftList) ?
                        <button onClick={() => filterNftList(obj.tokenId)}>Remove from sale</button>:
                        <button onClick={() => openSellModal(obj.tokenUri, obj.tokenId)}>Sell</button>}
                      </div>
              </div>
          ) :
          <h3>Mint your first NFT</h3>
        }
        <Modal className="modal" ariaHideApp={false} isOpen={modal.bool} onRequestClose={closeSellModal}>
          {modalSell}
        </Modal>
    </div> 
    )
}

export default MyAccount