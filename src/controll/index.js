import moment from 'moment'
import numeral from 'numeral'
import Bignumber from 'bignumber.js'
import Mongodb from '../mongodb'
import Payload from '../mongodb/model'
import PayloadBlock from '../mongodb/blockModel'
import eth from '../eth'
import config from '../config'

const controll = {
  createAddress: async (ctx) => {
    try {
      const address = await eth.createUser()
      eth.transaction(config.baseAddress, address, '', '10')
      ctx.body = address
    } catch (err) {
      ctx.status = 500
      console.log(err)
    }
  },
  send: async (ctx) => {
    try {
      const from = ctx.request.body.from.toLowerCase()
      const to = ctx.request.body.to.toLowerCase()
      const data = ctx.request.body.data
      const milege = ctx.request.body.milege
      const txid = await eth.transaction(from, to, data, milege)
      const mongodb = new Mongodb()
      const payload = new Payload({
        from,
        to,
        txid: txid.toLowerCase(),
        date: Date.now(),
      })
      await mongodb.save(payload)
      await mongodb.mongodb.connection.close()
      ctx.body = true
    } catch (err) {
      ctx.status = 500
      console.log(err)
    }
  },
  findAdressTxid: async (ctx) => {
    try {
      const address = ctx.params.address
      const mongodb = new Mongodb()
      const list = await mongodb.read(address.toLowerCase())
      const balance = await eth.balance(address.toLowerCase())
      await mongodb.mongodb.connection.close()
      await ctx.render('txids', {
        list,
        balance,
        moment,
        numeral,
      })
    } catch (err) {
      ctx.status = 500
      console.log(err)
    }
  },
  getTxid: async (ctx) => {
    const txid = ctx.params.txid
    const info = await eth.getTransaction(txid)
    await ctx.render('txid', {
      info,
      numeral,
      moment,
      Bignumber,
    })
  },
  allAddressList: async (ctx) => {
    try {
      const accounts = await eth.allAccounts()
      ctx.body = accounts
    } catch (err) {
      ctx.status = 500
      console.log(err)
    }
  },
  blockList: async (ctx) => {
    const mongodb = new Mongodb()
    mongodb.model = PayloadBlock
    const info = await PayloadBlock.find({}).sort({ number: -1 }).limit(10)
    await mongodb.mongodb.connection.close()
    ctx.body = info
  },
  currentBlock: async (ctx) => {
    const block = ctx.params.block
    const mongodb = new Mongodb()
    mongodb.model = PayloadBlock
    const info = await PayloadBlock.findOne({ number: block })
    await mongodb.mongodb.connection.close()
    await ctx.render('block', { info, numeral, moment })
  },
  getBlock: async (ctx) => {
    const block = ctx.request.body.block
    const info = await eth.getBlock(block)
    ctx.body = info
  },
  getBlockTran: async (ctx) => {
    const block = ctx.params.block
    const info = await eth.getBlock(block)
    await ctx.render('blockinfo', { info, numeral, moment })
  },
}

export default controll
