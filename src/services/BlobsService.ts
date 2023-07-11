import axios from 'axios'
import CONSTS from '../utils/consts'

class BlobsService {
  getContainerStorage = async () => {
    const request = CONSTS.API_BASE + CONSTS.API_BLOBS
    const response = await axios.get(request)
    return response.data
  }
}
const singletonInstance = new BlobsService()
Object.freeze(singletonInstance)
export default singletonInstance
