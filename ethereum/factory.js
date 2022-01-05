import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xcDdF168808b9172CA63536DF5897f7021DBb947D'
);

export default instance;