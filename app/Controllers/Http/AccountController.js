'use strict'

var  Web3 = require("web3")

const mainnet = 'http://127.0.0.1:7545';

let web3 = new Web3(new Web3.providers.HttpProvider(mainnet));

class AccountController {

    async balance({request, response, auth}) {

    }

}

module.exports = AccountController
