import mongoose from 'mongoose'

const Schema = mongoose.Schema
const model = new Schema({
  from: String,
  to: String,
  txid: String,
  date: Date,
})

export default mongoose.model('txid', model)
