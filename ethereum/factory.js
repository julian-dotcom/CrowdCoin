import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xa04384CF67be44A6D5f4870599f29A46fbc7Ea03'
    // '0xef4066c45ac32908b1825d27A17D0f75D1593A20' OLD CONTRACT
);

export default instance;