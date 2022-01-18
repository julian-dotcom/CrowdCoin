import React, { Component, useEffect } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign.js';
import { Router } from '../routes'; 
class RequestRow extends Component {

    state = {
        isManager: undefined,
        errorMessage: '',
        hasApproved: undefined,
        approvalCount: undefined,
        loadingApprove: false,
        loadingFinalize: false,
        isFinalized: undefined,
        accounts: [],
        campaign: {}
    }

    async componentDidMount() {
        await this.loadInfos();
        const manager = await this.state.campaign.methods.manager().call();
        const accounts = await web3.eth.getAccounts();
        const isManager = manager === accounts[0] ? true : false;
        this.setState({ isManager });
    }

    loadInfos = async () => {
        const campaign = Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();
        const hasApproved = await campaign.methods.hasApproved(this.props.id).call({ from: accounts[0] });
        const request = await campaign.methods.requests(this.props.id).call();
        const approvalCount = request.approvalCount;
        const isFinalized = request.complete;
        this.setState({ campaign, hasApproved, approvalCount, isFinalized });

    }

    onApprove = async () => {
        const accounts = await web3.eth.getAccounts();
        this.setState({ loadingApprove: true, errorMessage: ''});
        try {
            await this.state.campaign.methods.approveRequest(this.props.id).send({ from: accounts[0] });
            await this.loadInfos();
            Router.replaceRoute(`/campaigns/${this.props.address}/requests`)
        } catch (err) {
            this.setState({ errorMessage: err.message });
        } finally {
            this.setState({ loadingApprove: false });
        }
    }

    onFinalize = async () => {
        const accounts = await web3.eth.getAccounts();
        this.setState({ loadingFinalize: true, errorMessage: ''});
        try {
            await this.state.campaign.methods.finalizeRequest(this.props.id).send({ from: accounts[0] });
            await this.loadInfos();
            Router.replaceRoute(`/campaigns/${this.props.address}/requests`)
        } catch (err) {
            this.setState({ errorMessage: err.message });
        } finally {
            this.setState({ loadingFinalize: false });
        }
    }


    render() {
        const { Row, Cell } = Table;
        const { id, request, approversCount } = this.props;
        const readyToFinalize = request.approvalCount > approversCount/2;
        return (
            <Row disabled={this.state.isFinalized} positive={!readyToFinalize && this.state.isFinalized}>
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{request.approvalCount}/{approversCount}</Cell>
                <Cell>
                    <Button color='green' loading={this.state.loadingApprove} disabled={this.state.hasApproved} basic={this.state.hasApproved} onClick={this.onApprove}>{this.state.hasApproved ? 'Approved' : 'Approve'}</Button>
                </Cell>
                <Cell>
                    <Button color='teal' loading={this.state.loadingFinalize} disabled={this.state.isFinalized || !this.state.isManager} basic={this.state.isFinalized} onClick={this.onFinalize}>{this.state.isFinalized ? 'Finalized' : 'Finalize'}</Button>
                </Cell>
            </Row>
        )
    }

};

export default RequestRow;