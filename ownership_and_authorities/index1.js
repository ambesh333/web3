//Create a new account and transfer 0.001 SOL to it
const {
  Keypair,
  Connection,
  SystemProgram,
  Transaction,
} = require("@solana/web3.js");

const payer = Keypair.fromSecretKey(
  Uint8Array.from([
    121, 244, 93, 75, 183, 57, 105, 164, 6, 242, 57, 180, 146, 212, 241, 158,
    204, 116, 6, 186, 186, 29, 44, 123, 93, 249, 70, 104, 148, 209, 78, 55, 109,
    90, 189, 157, 206, 9, 49, 114, 219, 60, 100, 77, 55, 193, 241, 212, 120,
    246, 117, 219, 240, 54, 82, 132, 158, 21, 188, 148, 241, 186, 190, 112,
  ])
);

const connection = new Connection("https://api.devnet.solana.com");
async function main() {
  const newAccount = Keypair.generate();
  const transaction = new Transaction();
  transaction.add(
    SystemProgram.transfer({
      fromPubkey: payer.publicKey,
      toPubkey: newAccount.publicKey,
      lamports: 0.001 * 10 ** 9,
    })
  );

  await connection.sendTransaction(transaction, [payer]);
  console.log(`Transferred 0.001 SOL to ${newAccount.publicKey.toBase58()}`);
}

main();
