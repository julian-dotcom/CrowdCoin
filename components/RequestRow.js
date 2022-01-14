import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign.js';
import { Router } from '../routes'; 
class RequestRow extends Component {
    componentDidMount = async() => {
        console.log('hihii')

        const campaign = Campaign(this.props.address);
        const request = this.props.request;
        const accounts = await web3.eth.getAccounts();
        console.log(request)
        console.log('Request: ', this.props.request.approvals[accounts[0]])
        // const isApproved = this.props.requestapprovals(accounts[0]);
        console.log('hihii')
        console.log('isApproved: ', isApproved)

        return { campaign, isApproved }
    }
    state = {
        errorMessage: '',
        approveColorBasic: this.props.isApproved,
        approveContent: 'Approve',
        loading: false
    }

    onApprove = async () => {
        this.setState({ loading: true, errorMessage: ''});
        const accounts = await web3.eth.getAccounts();
        try {
            await campaign.methods.approveRequest(this.props.id).send({ from: accounts[0] });

        } catch (err) {
            this.setState({ errorMessage: err.message });
        } finally {
            this.setState({ loading: false });
        }
        this.setState({ approveColor: ''})

    }
    render() {
        const { Row, Cell } = Table;
        const { id, request, approversCount } = this.props;
        return (
            <Row>
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{request.approvalCount}/{approversCount}</Cell>
                <Cell>
                    <Button color='green' loading={this.state.loading} basic={this.state.approveColorBasic} onClick={this.onApprove}>Approve</Button>
                </Cell>
                <Cell></Cell>
            </Row>
        )
    }

};

export default RequestRow;