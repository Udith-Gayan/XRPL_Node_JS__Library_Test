var util= require('util');
var encoder = new util.TextEncoder('utf-8');

const xrpl = require("xrpl")

async function main() {
    // Define the network client
    const MY_SERVER = "ws://localhost:6006
    /"
    const client = new xrpl.Client(MY_SERVER)
    await client.connect()
  
    // ... custom code goes here
    // Create a wallet and fund it with the Testnet faucet:
    // const fund_result = await client.fundWallet()
    // const test_wallet = fund_result.wallet
    // console.log(fund_result)

    // const test_wallet = xrpl.Wallet.generate()
    const test_wallet = xrpl.Wallet.fromSeed("rDgfxxJ7HoSby2SuR9u6PNXKijfEurKsZq");

    const response = await client.request({
        "command": "account_info",
        "account": test_wallet.address,
        "ledger_index": "validated"
      })
    console.log('Balance  = ' + response.result.account_data.Balance)
    

  console.log(response)

    // Disconnect when done (If you omit this, Node.js won't end the process)
    client.disconnect()
}

main()