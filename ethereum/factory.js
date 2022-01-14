import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xC6Ef2D86D84f643Fc2925CfD99F4097C462bDB40'
);

export default instance;
