'use strict'

// Add to the top of the file
const User = use('App/Models/User')
const { validate } = use('Validator')

var  Web3 = require("web3")

const mainnet = 'http://127.0.0.1:7545';

let web3 = new Web3(new Web3.providers.HttpProvider(mainnet));

class UserController {
    newAccounts () {
        // Promise callback style
        web3.eth.personal.newAccount(password)
        .then(data => callback(data)
        )

        // Attaches a callback for only the rejection of the Promise   
        .catch(err => {
            console.log("Error: " + err)
        })
    }

    async signup({request, response, auth}) {
        try {
            // Validate form input
            const validation = await validate(request.all(), {
                email: 'required|email:unique:users',
                username: 'required|unique:users',
                password: 'required'
            })
        
            // Show error messages upon validation fail
            if (validation.fails()) {
                return response.send(validation.messages())
            }

            // Instance user
            const user = new User()
            user.email = request.input('email')
            user.username = request.input('username')
            user.password = request.input('password')
            
            // Saving the user data
            await user.save()
            
            // Adding await keyword, because web3.eth.personal.newAccount as promise callback style
            const address = await web3.eth.personal.newAccount(request.input('password'))
            
            // Generate JWT token for user
            const token = await auth.generate(user)
            
            // Show response
            return response.json({
                message: 'Successfully',
                data: address
            })
        } catch (error) {
            // Show response
            return response.status(400).json({
                status: 'error',
                message: 'You can\'t register. Please try again!'
            })
        }    
    }

    async signin({request, response, auth}) {
        try {
            const parameter = request.only(['email', 'password'])
            
            if (!parameter) {
                // Show response
                return response.status(404).json({
                    status: 'error',
                    data: 'Resource not found'
                })
            }
            
            // Trying login
            const token = await auth.attempt(parameter.email, parameter.password)
            
            // Show response
            return response.json({
                token: token
            })
        } catch(err) {
            // Show response
            return response.status(400).json({
                status: 'error',
                message: 'You can\'t login. Please try again!'
            })
        }
    }
}

module.exports = UserController