import React, { Component } from 'react';
import { Card, Grid } from 'semantic-ui-react';
import ContributeForm from '../../components/ContributeForm';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';

class CampaignShow extends Component {
    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();
        return {
            address: props.query.address,
            minimumContribution: summary['0'],
            balance: summary['1'],
            requestCount: summary['2'],
            approversCount: summary['3'],
            manager: summary['4'],
        };
    }

    renderCards() {
        const { 
            balance,
            manager,
            minimumContribution,
            requestCount,
            approversCount
        } = this.props;

        const items = [
            {
                header: manager,
                meta: 'Address of manager', 
                description: 'The manager created this campaign and can create requests.',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution,
                meta: 'Minimum contribution (wei)',
                description: 'You must contribute at least this much wei to become an approver.'
            },
            { 
                header: requestCount,
                meta: 'Number of requests',
                description: 'A request tries to withdraw money from the contract. Requests must be approved by approvers.'
            },
            { 
                header: approversCount,
                meta: 'Numbers of approvers', 
                description: 'Number of people who have already donated to the campaign.'
            },
            { 
                header: web3.utils.fromWei(balance, 'ether'), 
                meta: 'Campaign balance (ether)', 
                description: 'The balance is how much money the campaign has left to spend.'
            }

        ];

        return <Card.Group items={items} />;
    };

    render() {
        return (
            <Layout>
                <h3>Campaign show</h3>
                <Grid>
                    <Grid.Column width={10}>
                            {this.renderCards()}
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address} />
                        </Grid.Column>
                </Grid>
            </Layout>
        )
    }
}

export default CampaignShow;