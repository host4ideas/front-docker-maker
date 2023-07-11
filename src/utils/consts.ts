const apiContainers = '/api/Containers/'
const apiRegistries = '/api/ContainerRegistries/'
const apiResourceGroups = '/api/ResourceGroups/'

const CONSTS = {
  AVAILABLE_REGIONS: [
    'AustraliaCentral',
    'AustraliaCentral2',
    'AustraliaEast',
    'AustraliaSoutheast',
    'BrazilSouth',
    'BrazilSoutheast',
    'CanadaCentral',
    'CanadaEast',
    'CentralIndia',
    'CentralUS',
    'ChinaEast',
    'ChinaEast2',
    'ChinaNorth',
    'ChinaNorth2',
    'DisplayName',
    'EastAsia',
    'EastUS',
    'EastUS2',
    'FranceCentral',
    'FranceSouth',
    'GermanyCentral',
    'GermanyNorth',
    'GermanyNorth<wbr>East',
    'GermanyWest<wbr>Central',
    'JapanEast',
    'JapanWest',
    'KoreaCentral',
    'KoreaSouth',
    'Name',
    'NorthCentralUS',
    'NorthEurope',
    'NorwayEast',
    'NorwayWest',
    'QatarCentral',
    'SouthAfrica<wbr>North',
    'SouthAfrica<wbr>West',
    'SouthCentralUS',
    'SoutheastAsia',
    'SouthIndia',
    'SwedenCentral',
    'SwitzerlandNorth',
    'SwitzerlandWest',
    'UAECentral',
    'UAENorth',
    'UKSouth',
    'UKWest',
    'USDoDCentral',
    'USDoDEast',
    'USGovArizona',
    'USGovIowa',
    'USGovTexas',
    'USGovVirginia',
    'WestCentralUS',
    'WestEurope',
    'WestIndia',
    'WestUS',
    'WestUS2',
    'WestUS3'
  ],
  API_BLOBS: '/api/AzureTest/',
  API_CONTAINERS: apiContainers,
  API_REGISTRIES: apiRegistries,
  API_CONTAINERS_INSTANCES: apiContainers + 'instances/',
  API_CONTAINERS_DELETE_GROUP: apiContainers + 'DeleteGroup/',
  API_CONTAINERS_START: apiContainers + 'Actions/Start/',
  API_CONTAINERS_STOP: apiContainers + 'Actions/Stop/',
  API_CONTAINERS_EXEC: apiContainers + 'Actions/Exec/',
  API_CONTAINERS_EXEC_ALL: apiContainers + 'Actions/ExecAll/',
  API_CONTAINERS_RGS: apiResourceGroups,
  API_BASE: import.meta.env.VITE_API_ENDPOINT
}

export default CONSTS
