import cron from 'node-cron'
import Mongo from '../mongodb/index'
import Model from '../mongodb/blockModel'
import eth from '../eth/index'

const blockSave = async (mongodb, data, i) => {
  const payload = new Model(data)
  await mongodb.save(payload)
  console.log(`${i} block saved.`)
}

const block = async () => {
  const mongodb = new Mongo()
  mongodb.model = Model
  const currentBlock = await mongodb.model.find({}).sort({ number: -1 }).limit(1).then((item) => item[0].number) + 1
  const lastBlock = await eth.currentBlock()
  console.log(`find block : ${currentBlock} ~ ${lastBlock}`)
  console.log('// Block save start')
  for (let i = currentBlock; i <= lastBlock; i += 1) {
    const blockInfo = await eth.getBlock(i)
    await blockSave(mongodb, blockInfo, i)
  }
  console.log('Block save end //')
  await mongodb.mongodb.connection.close()
}

cron.schedule('*/3 * * * * *', async () => {
  block()
})
