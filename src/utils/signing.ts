import { Keypair, Transaction, Networks } from '@stellar/stellar-sdk';

/**
 * Sign a SEP-10 challenge transaction envelope.
 * @param transactionXdr - Base64-encoded XDR transaction from the anchor
 * @param keypair - Stellar keypair to sign with
 * @param networkPassphrase - Network passphrase (e.g. Networks.TESTNET)
 * @returns Signed transaction XDR
 */
export function signChallengeTransaction(
  transactionXdr: string,
  keypair: Keypair,
  networkPassphrase: string,
): string {
  const tx = new Transaction(transactionXdr, networkPassphrase);
  tx.sign(keypair);
  return tx.toEnvelope().toXDR('base64');
}

export { Networks };
