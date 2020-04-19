import mongoose from 'mongoose'
import config from '../config'
import Payload from './model'

class Mongodb {
  /**
   *Creates an instance of Mongodb.
   * @memberof Mongodb
   */
  constructor() {
    this.mongodb = mongoose
    let url = config.mongodb.local
    if (process.NODE_ENV === 'development') {
      url = config.mongodb.dev
    } else if (process.NODE_ENV === 'production') {
      url = config.mongodb.production
    }
    this.mongodb.Promise = global.Promise
    this.mongodb.connect(`${url}/gethinfo`, { useNewUrlParser: true })
    this.model = Payload
  }

  /**
   * 저장
   * @param {*} mogodbModel 몽고디비 모델 스키마
   * @memberof Mongodb
   */
  async save(mogodbModel) {
    this.model = mogodbModel
    await this.model.save()
  }

  /**
   * 불러오기
   * @param {*} address 주소
   * @returns
   * @memberof Mongodb
   */
  async read(address) {
    const read = await this.model.find().or([{ from: address }, { to: address }])
    return read
  }

  async txid() {
    const read = await this.model.find()
    return read
  }
}

export default Mongodb
