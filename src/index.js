import Koa from 'koa'
import koaBody from 'koa-body'
import logger from 'koa-logger'
import cors from '@koa/cors'
import views from 'koa-views'
import path from 'path'
import router from './router'
import './controll/blockControll'

const app = new Koa()

app.use(cors())
app.use(koaBody({ multipart: true }))
app.use(logger())
app.use(views(path.join(__dirname, '../src/views'), { extension: 'ejs' }))

app.use(router.routes())
app.listen(8700, () => console.log('##server started http://localhost:8700'))
