export const handleTransactionError = (
  error,
  context = "transaction",
  logToConsole = "true",
) => {
  if (logToConsole) {
    console.error(`Error in ${context}: `, error);
  }

  let errorMessage = "Transaction Failed";
  let errorCode = "UNKOWN_ERROR";

  const code =
    error?.code ||
    (error?.error && error.error.code) ||
    (error.data && error.data.code);

  const isRejected =
    (error?.message && error.message.includes("User rejected")) ||
    error.message.includes("Rejected transaction") ||
    error.message.includes("User denied") ||
    error.message.includes("ACTION_REJECTED");

  if (isRejected || code === "ACTION_REJECTED" || code === 4001) {
    errorMessage = "Transaction rejected by the user";
    errorCode = "ACTION_REJECTED";
  } else if (code === "INSUFFICIENT_FUNDS" || code === -32000) {
    errorMessage = "Insufficient funds for transactions";
    errorCode = "INSUFFICIENT_FUNDS";
  } else if (error.reason) {
    errorMessage = error.reason;
    errorCode = "CONTRACT_ERROR";
  } else if (error.message) {
    const message = error.message;

    if (message.includes("gas required exceeds allowance")) {
      errorMessage = "Gas required exceeds your ETH balance";
      errorCode = "INSUFFICIENT_FUNDS";
    } else if (message.includes("nonce too low")) {
      errorMessage = "Transaction with same nonce already processed!";
      errorCode = "NONCE_TOO_LOW";
    } else if (message.includes("replacement transaction underpriced")) {
      errorMessage = "Gas price too low to replace pending transaction";
      errorCode = "GAS_PRICE_ERROR";
    } else {
      errorMessage = message;
    }
  }

  return { message, errorMessage, code: errorCode };
};

export const ERC20_ABI = [
  "function name() view returns(string)",
  "function symbol() view returns(string)",
  "function decimals() view returns(uint8)",
  "function totalSupply() view returns(uint256)",
  "function balanceOf(address owner) view returns(uint256)",
  "function transfer(address to, uint256 amount) returns(bool)",
  "function approve(address spender, uint256 amount) returns(bool)",
  "function allowance(address owner, address spender) view returns(uint256)",
  "function transferFrom(address from, address to, uint256 amount) returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event approval(address indexed owner, address indexed spender, uint256 value)",
];

export const generateId = () =>
  `transaction-${Date.now()}-${Math.toString(36).substring(2, 5)}`;
