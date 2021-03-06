'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
    Route.post('users/signup', 'UserController.signup')     
    Route.post('users/signin', 'UserController.signin')
    Route.post('users/account', 'AccountController.account')
    Route.get('users/createaccount', 'CreateAccountController.create')
    Route.get('users/createwallet', 'CreateWalletController.create')
}).prefix('api/v1')

Route.group(() => {
    Route.get('contacts', 'ContactController.index')
    Route.get('contact/:id', 'ContactController.show')
    Route.post('contact', 'ContactController.store')
    Route.put('contacts/:id', 'ContactController.update') 
    Route.delete('contacts/:id', 'ContactController.destroy')
    Route.patch('contacts/:id/star', 'ContactController.starContact')
    Route.get('starred/contacts', 'ContactController.starredContacts')
}).prefix('api/v1').middleware(['auth'])

/* Route.get('getBalance',({request, response}) => {
    const axios = use('axios');
    const getBreeds = async () => {
        try {
            return await axios.get('https://rinkeby.etherscan.io/api', {
                params: {
                    module: request.input('module'),
                    action: request.input('action'),
                    address: request.input('address'),
                    tag: request.input('tag'),
                    apikey: request.input('apikey')
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

    const countBreeds = async () => {
        const breeds = await getBreeds()

        if (breeds.data.result) {
            console.log(breeds.data.result)
        }
    }

    countBreeds()
}) */