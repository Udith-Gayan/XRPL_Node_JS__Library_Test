const xrpl = require("xrpl")

// Wrap code in an async function so we can use await
async function main() {

    // Define the network client
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
    await client.connect()
  
    
    // Get Ledger Info
    const test_wallet = xrpl.Wallet.fromSeed("snY8EKMjFtathoeBAf4Ueyt277Xu5")

    // Get info from the ledger about the address we just funded
    const response = await client.request({
      "command": "account_info",
      "account": test_wallet.address,
      "ledger_index": "validated"
    })
    console.log('Balance  = ' + response.result.account_data.Balance)


    // Send Credits
    // Prepare transaction -------------------------------------------------------
    const prepared = await client.autofill({
      "TransactionType": "Payment",
      "Account": test_wallet.address,
      "Amount": xrpl.xrpToDrops("20"),
      "Destination": "rLft58EzCGTjX8sFtiAWQ7im3a7snEaLcP"
    })
    const max_ledger = prepared.LastLedgerSequence
    console.log("Prepared transaction instructions:", prepared)
    console.log("Transaction cost:", xrpl.dropsToXrp(prepared.Fee), "XRP")
    console.log("Transaction expires after ledger:", max_ledger)


    // Sign prepared instructions ------------------------------------------------
    const signed = test_wallet.sign(prepared)
    console.log("Identifying hash:", signed.hash)
    console.log("Signed blob:", signed.tx_blob)

    // Submit signed blob --------------------------------------------------------
    const tx = await client.submitAndWait(signed.tx_blob)

    // Check transaction results -------------------------------------------------
    console.log("Transaction result:", tx.result.meta.TransactionResult)
    console.log("Balance changes:", JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2))


  
    // Disconnect when done (If you omit this, Node.js won't end the process)
    client.disconnect()
  }
  
main()