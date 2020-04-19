import Router from 'koa-router'
import controll from '../controll'

const router = new Router()

// transaction send
router.post('/send', controll.send)
// create address
router.post('/create', controll.createAddress)
// main render
router.get('/', async (ctx) => {
  await ctx.render('main')
})
// address txid balance render and data
router.get('/address/:address', controll.findAdressTxid)
// txid render and data
router.get('/txid/:txid', controll.getTxid)
// block list
router.get('/block', controll.blockList)
// block check
router.get('/block/:block', controll.currentBlock)


router.get('/all', controll.allAddressList)
router.get('/block/:txid', controll.getBlock)

router.get('/address', async (ctx) => {
  await ctx.render('address')
})




export default router
