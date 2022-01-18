import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x10998ED2529396854b3812c58Fc7D83d0EaDB0E2'
);

export default instance;
