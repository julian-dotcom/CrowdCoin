import React, { Component } from 'react';
import { Form, Message, Button, Input } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign'
import { Router } from '../routes'

class ContributeForm extends Component {
    state = {
        value: '',
        errorMessage: '',
        loading: false    
    };

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({ loading: true, errorMessage: '' });
        const campaign = Campaign(this.props.address);

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods
                .contribute()
                .send({ 
                    from: accounts[0],
                    value: web3.utils.toWei(this.state.value, 'ether')
                });
            Router.replaceRoute(`/campaigns/${this.props.address}`)
            } catch(err) {
                this.setState({ errorMessage: err.message });
        }
        this.setState({ loading: false });

    };

    render() {
        return (
            <div>
            <br />
            <Form onSubmit={this.onSubmit} error={ this.state.errorMessage !== '' }>
                <Form.Field>
                    <label>Contribute to this campaign!</label>
                    <Input 
                        label='ether' 
                        labelPosition='right' 
                        value={this.state.value}
                        onChange={event => this.setState({ value: event.target.value }) }
                    />
                </Form.Field>
                <Message error header='Oops!' content={this.state.errorMessage} />
                <Button loading={ this.state.loading } primary>Contribute!</Button>
            </Form>
            </div>
        )
    }
}

export default ContributeForm;