import React from "react";

type nftListProps = {
    nftList:nftType[];
    _handleBuyNFT: (id:string,price:string) => void;
}
type nftType = {tokenId:string, tokenUrl:string, tokenPrice:string}

const NftList: React.FunctionComponent<nftListProps> | any = ({nftList, _handleBuyNFT}: nftListProps) => {        
    return (
        <div className="nftList">
        {nftList?.map((nft: nftType) => 
        <div className="nft" key={nft.tokenId} >
            <img src={nft.tokenUrl} alt={nft.tokenId}/>
            <div className="nftDescription">
                <h3>Happy NFT {nft.tokenId}</h3>
                <h4>Price: {nft.tokenPrice} ETH</h4>
                <button onClick={() => _handleBuyNFT(nft.tokenId,nft.tokenPrice)}>Buy NFT</button>
            </div>
        </div>
        )}
    </div>
    )     
}

export default NftList