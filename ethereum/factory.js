import web3 from './web3';
import CampaignFactory from './build/CampaignFactory';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xef4066c45ac32908b1825d27A17D0f75D1593A20'
);

export default instance;