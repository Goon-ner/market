import React from "react";

type WaitingForTransactionMessageProps = {
  txHash: string;
};

const WaitingForTransactionMessage: React.FunctionComponent<
  WaitingForTransactionMessageProps
> = ({ txHash }) => {
  return (
    <div>
      Waiting for transaction <strong>{txHash.slice(0,4)+ '...'+txHash.slice(39,42) }</strong>
    </div>
  );
};

export default WaitingForTransactionMessage;