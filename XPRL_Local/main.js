const xrpl = require("xrpl")

async function main() {
    // Define the network client
    // const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
    // await client.connect()

    // Generate a wallet
    // const test_wallet = xrpl.Wallet.generate()
    const test_wallet = xrpl.Wallet.fromSeed("sEdS4mwwV4NKgvq8Hg1bqGh3o3ewqM4")

    console.log(test_wallet)
    const response = await client.request({
        "command": "account_info",
        "account": test_wallet.address,
        "ledger_index": "validated"
    })

    console.log(response)
    

    // Disconnect when done (If you omit this, Node.js won't end the process)
    // client.disconnect()
}

main()