'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WalletSchema extends Schema {
  up () {
    this.create('wallets', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('wallets')
  }
}

module.exports = WalletSchema
