'use strict'

var Web3 = require("web3")
var util = require("util")
var ethers = require('ethers')

const mainnet = 'http://127.0.0.1:7545'
const Wallet = use('App/Models/Wallet')
const rinkeby = 'https://rinkeby.etherscan.io/'

let web3 = new Web3(new Web3.providers.HttpProvider(rinkeby));

class CreateWalletController {
    async create({ response }) {
        // const cw = await web3.eth.accounts.wallet.create(2, '54674321§3456764321§345674321§3453647544±±±§±±±!!!43534534534534')

        
        try {
            /* let privateKey = "0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a";
            let wallet = new ethers.Wallet(privateKey); */
            
            let randomWallet = ethers.Wallet.createRandom()
            // var wallet = randomWallet
            
            let wallet = new Wallet()
            wallet.private_key = randomWallet.signingKey.keyPair.privateKey
            wallet.public_key = randomWallet.signingKey.keyPair.publicKey
            wallet.mnemonic = randomWallet.mnemonic


            const save = await wallet.save()


            // console.log(util.inspect(save))
            return response.json({
                message: 'Successfully',
                data: randomWallet
            })
            
        } catch (error) {
            
        }

    }
}

module.exports = CreateWalletController
