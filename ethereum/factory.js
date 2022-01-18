import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x9Dfc0880832232778c63641BBDdc5Dd7cbdb87ed'
);

export default instance;
