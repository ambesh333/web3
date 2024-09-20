import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useState } from "react";
export function Airdrop() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState("");

  async function sendAirdropToUser() {
    const lamports = parseFloat(amount) * 1000000000;
    if (isNaN(lamports) || lamports <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    try {
      await connection.requestAirdrop(wallet.publicKey, lamports);
      alert(`Airdrop of ${amount} SOL requested successfully`);
    } catch (error) {
      console.error("Airdrop error:", error);
      alert("Airdrop request failed. Please try again.");
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter amount in SOL"
        style={{ marginRight: "10px" }}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={sendAirdropToUser}>Send Airdrop</button>
      <div style={{ marginTop: "10px" }}>
        <button
          onClick={async () => {
            if (wallet.publicKey) {
              const balance = await connection.getBalance(wallet.publicKey);
              alert(`Your balance is ${balance / 1000000000} SOL`);
            } else {
              alert("Please connect your wallet first");
            }
          }}
        >
          Show Balance
        </button>
      </div>
    </div>
  );
}
