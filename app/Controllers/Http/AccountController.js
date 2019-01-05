'use strict'
//import * as util from 'util' // has no default export
//import { inspect } from 'util' // or directly
var Web3 = require("web3")
var util = require("util")

const axios = require('axios')
const Account = use('App/Models/Account')

class AccountController {
    async account({request, response}) {
        try {
            const account = new Account()
            account.module  = request.input('module')
            account.action  = request.input('action')
            account.address = request.input('address')
            account.tag     = request.input('tag')
            account.apikey  = request.input('apikey')
            
            await account.save()

            // const url = 'https://api.etherscan.io/api?module=account&action=balance&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a&tag=latest&apikey=QVX1I9417EQJBBN8ZAWNB82H7UXZR5J4QW'

            const url = 'https://api.etherscan.io/api'
            let data = {
                params: {
                    module: account.module,
                    action: account.action,
                    address: account.address,
                    tag: account.tag,
                    apikey: account.apikey
                }
            }
            const getacc = await axios.get(url, data);
            
            // Debugging via console
            // console.log(util.inspect(getacc));
            
            /*##### Start display message when ERROR from API local to server Etherscan #####*/
            if(getacc.data.message == 'NOTOK') {
                return response.json({
                    status:1,
                    message: getacc.data.result
                    
                })
            } else {
                return response.json({
                    status:0,
                    message: 'BERHASIL',
                    data: getacc.data.result
                })
            }
            /*##### End display message when ERROR from API local to server Etherscan #####*/
        } catch (error) {
            /*##### Start display message when ERROR from frontend to API local #####*/
            // console.error(error)
            return response.status(500).json({
                status: 402,
                message: getacc.data.result
            })
            /*##### End display message when ERROR from frontend to API local #####*/
        }
    }
}

module.exports = AccountController