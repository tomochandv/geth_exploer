import mongoose from 'mongoose'

const Schema = mongoose.Schema
const model = new Schema({
  number: Number,
  hash: String,
  parentHash: String,
  nonce: String,
  sha3Uncles: String,
  logsBloom: String,
  transactionsRoot: String,
  stateRoot: String,
  miner: String,
  difficulty: String,
  totalDifficulty: String,
  extraData: String,
  size: Number,
  gasLimit: Number,
  gasUsed: Number,
  timestamp: Number,
  transactions: Array,
  uncles: Array,
})

export default mongoose.model('block', model)
