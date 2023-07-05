import React, { useCallback, useEffect } from "react";

import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";

// import { useAccount, useNetwork } from "wagmi";

import { useModal } from "context/modal/modalProvider";

import Modal from "../modal";

// import WrongChain from "./WrongChain";
// import WrongWallet from "./WrongWallet";

const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === "production";
const validChain = isProduction ? 137 : 80001;

const Web3Errors = () => {
  const { t } = useTranslation("common");
  // const { chain } = useNetwork();
  // const { address } = useAccount();

  // const { data: session } = useSession();
  const { modalIsOpen, childrenName, setModalIsOpen, openModal, closeModal } =
    useModal();

  // const handleWrongChain = useCallback(() => {
  //   if (chain && chain.id !== validChain) {
  //     openModal('chain');
  //   } else if ((!chain?.id || chain?.id === validChain) && childrenName === 'chain') {
  //     closeModal();
  //   }
  // }, [chain]);

  // useEffect(() => {
  //   handleWrongChain();
  // }, [handleWrongChain]);

  return (
    <Modal
      ctaHeaderTitle={t("ctaHeaderTitle")}
      ctaHeaderClassName="text-skyblue-600 text-sm font-bold"
      isOpen={modalIsOpen}
      setIsOpen={setModalIsOpen}
      experimental={true}
      shouldClose={childrenName === "chain"}
    >
      {childrenName === "wallet" ? (
        <></>
      ) : (
        // <WrongChain chainId={chain?.id} validChain={validChain} />
        <></>
      )}
    </Modal>
  );
};

export default Web3Errors;
