import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import web3 from '../../../ethereum/web3';
import Contract from '../../../ethereum/campaign'; 
class RequestNew extends Component {
    state = {
        description: '',
        amount: '',
        recipient: '',
        loading: '',
        errorMessage: ''
    };

    onSubmit = async event => {
        event.preventDefault();
        this.setState({ loading: true, errorMessage: '' });
        const campaign = Contract(this.props.address);
        try {
            console.log(this.state.amount)
            let accounts = await web3.eth.getAccounts();
            await campaign.methods
                .createRequest(
                    this.state.description, 
                    web3.utils.toWei(this.state.amount, 'ether'), 
                    this.state.recipient
                )
                .send({
                    from: accounts[0]
                });

        } catch(err) {
            console.log(err)
            this.setState({ errorMessage: err.message })
        }
        this.setState({ loading: false })
    };

    render() {
        return (
            <Layout>
                <h3>Create a new request</h3>
                <Form onSubmit={this.onSubmit} error={ this.state.errorMessage !== '' }>
                <Form.Field>
                        <label>Description</label>
                        <Input 
                            label='Buy cases' 
                            labelPosition='right'
                            value={this.state.description}
                            onChange={event => this.setState({ description: event.target.value})}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Amount in ether</label>
                        <Input 
                            label='Ether' 
                            labelPosition='right' 
                            value={this.state.amount}
                            onChange={event => this.setState({ amount: event.target.value})}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Recipient</label>
                        <Input 
                            label='Address' 
                            labelPosition='right' 
                            recipient={this.state.recipient}
                            onChange={event => this.setState({ recipient: event.target.value})}
                        />
                    </Form.Field>

                    <Message error header='Oops!' content={this.state.errorMessage} />
                    <Button primary loading={this.state.loading} >Create</Button>
                </Form>
            </Layout>
        )
    }
}

export default RequestNew;