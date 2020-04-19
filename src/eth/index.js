import Web3 from 'web3'
import config from '../config'

let url = config.geth.local
if (process.env.NODE_ENV === 'development') {
  url = config.geth.dev
} else if (process.env.NODE_ENV === 'production') {
  url = config.geth.production
}

const web3 = new Web3(url)

const isConnected = async () => {
  let result = false
  try {
    const isListening = await web3.eth.net.isListening()
    if (isListening) {
      result = true
    }
  } catch (err) {
    console.log(err)
    result = false
  }
  return result
}

const eth = {
  /**
   * 주소생성
   * @returns 주소
   */
  createUser: async () => {
    try {
      let address = ''
      if (await isConnected()) {
        address = await web3.eth.personal.newAccount('')
      }
      return address
    } catch (err) {
      throw err
    }
  },
  /**
   * txid 발생시키고 보내기
   * @param {String} from 보내는 주소
   * @param {String} to 받는 주소
   * @param {Object} data 데이터
   * @param {String} 수량 데이터
   * @returns txid
   */
  transaction: async (from, to, data, milege) => {
    try {
      let txid = ''
      if (await isConnected()) {
        const txObj = {
          from,
          to,
          value: web3.utils.toHex(web3.utils.toWei(milege, 'ether')),
          data: web3.utils.toHex(JSON.stringify(data)),
        }
        txid = await web3.eth.personal.sendTransaction(txObj, '')
      }
      return txid
    } catch (err) {
      throw err
    }
  },
  /**
   * 모든 계정 가져오기
   * @returns
   */
  allAccounts: async () => {
    try {
      const list = await web3.eth.getAccounts()
      return list
    } catch (err) {
      throw err
    }
  },
  balance: async (address) => {
    const blance = await web3.eth.getBalance(address)
    const ethBalance = web3.utils.fromWei(blance)
    return ethBalance
  },
  currentBlock: async () => {
    const block = await web3.eth.getBlockNumber()
    return block
  },
  getTransaction: async (txid) => {
    const tran = await web3.eth.getTransaction(txid)
    tran.value = web3.utils.fromWei(tran.value)
    tran.input = web3.utils.hexToUtf8(tran.input)
    return tran
  },
  getBlock: async (block) => {
    const blockInfo = await web3.eth.getBlock(block)
    return blockInfo
  },
}

export default eth
