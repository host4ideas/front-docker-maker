import axios from 'axios'
import CONSTS from '../utils/consts'
import { RegistryView, RepoImage } from '../utils/types'

class RegistriesService {
  getRegistries = async () => {
    const request = CONSTS.API_BASE + CONSTS.API_REGISTRIES
    const response = await axios.get<RegistryView[]>(request)
    return response.data
  }

  getRegistryRepos = async (loginUrl: string) => {
    const request = CONSTS.API_BASE + CONSTS.API_REGISTRIES + loginUrl
    const response = await axios.get<RepoImage[]>(request)
    return response.data
  }

  getRegistryRepoVersion = async (repoUrl: string) => {
    const request = CONSTS.API_BASE + CONSTS.API_REGISTRIES + 'tags/' + repoUrl

    const response = await axios.get<string[]>(request)
    return response.data
  }

  deleteRegistryRepo = async (loginUrl: string, repoName: string) => {
    const request =
      CONSTS.API_BASE + CONSTS.API_REGISTRIES + loginUrl + '/' + repoName
    await axios.delete(request)
  }
}

const singletonInstance = new RegistriesService()
Object.freeze(singletonInstance)
export default singletonInstance
