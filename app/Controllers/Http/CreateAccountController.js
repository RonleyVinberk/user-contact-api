'use strict'

var Web3 = require("web3")
var util = require("util")

const mainnet = 'http://127.0.0.1:7545'
const Account = use('App/Models/Account')

let web3 = new Web3(new Web3.providers.HttpProvider(mainnet));

class CreateAccountController {
    async create() {
        const ca =  await web3.eth.accounts.create(web3.utils.randomHex(32))

        console.log(util.inspect(ca))
    }
}

module.exports = CreateAccountController
