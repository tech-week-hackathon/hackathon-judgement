"use client";

import React, { useState, useEffect } from "react";
import { RadioGroup, Radio } from "@blueprintjs/core";

export const Wallet = () => {
  const [whichWalletSelected, setWhichWalletSelected] = useState("");
  const [wallets, setWallets] = useState<string[]>([]);

  useEffect(() => {
    if (window.cardano) {
      setWallets(Object.keys(window.cardano));
    }
  }, []);

  const handleWalletSelect = (wallet: string) => {
    setWhichWalletSelected(wallet);
    window.cardano[wallet].enable();
  };

  return (
    <div style={{ margin: "20px" }}>
      <div style={{ paddingTop: "10px" }}>
        <div style={{ marginBottom: 15 }}>Select wallet:</div>
        <RadioGroup
          onChange={(e) => handleWalletSelect(e.currentTarget.value)}
          selectedValue={whichWalletSelected}
          inline={true}
          className="wallets-wrapper"
        >
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {wallets.map((key) => (
              <Radio key={key} className="wallet-label" value={key}>
                <img
                  src={window.cardano[key].icon}
                  width={24}
                  height={24}
                  alt={key}
                />
                {window.cardano[key].name} ({key})
              </Radio>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default Wallet;