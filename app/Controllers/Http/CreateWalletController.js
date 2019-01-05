'use strict'

var Web3 = require("web3")
var util = require("util")

const mainnet = 'http://127.0.0.1:7545'
const Account = use('App/Models/Wallet')

let web3 = new Web3(new Web3.providers.HttpProvider(mainnet));

class CreateWalletController {
    async create() {
        const cw = await web3.eth.accounts.wallet.create(2, '54674321§3456764321§345674321§3453647544±±±§±±±!!!43534534534534')

        console.log(util.inspect(cw))
    }
}

module.exports = CreateWalletController
