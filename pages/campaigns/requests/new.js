import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import { Link, Router } from '../../../routes'
import web3 from '../../../ethereum/web3';
import Contract from '../../../ethereum/campaign'; 
class RequestNew extends Component {

    static async getInitialProps(props) {
        return { 
            address: props.query.address
        }
    }
    state = {
        description: '',
        amount: '',
        recipient: '',
        loading: false,
        errorMessage: '',
    };

    onSubmit = async event => {
        event.preventDefault();
        this.setState({ loading: true, errorMessage: '' });
        const campaign = Contract(this.props.address);
        try {
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
            Router.pushRoute(`/campaigns/${this.props.address}/requests`);
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
                    {/* <Message success header='Great!' content='Successfully created request' /> */}
                    <Button primary loading={this.state.loading} >Create</Button>
                    
                    <Link route={`/campaigns/${this.props.address}/requests`}>
                        <a><Button>Back</Button></a>
                    </Link>
                </Form>
            </Layout>
        )
    }
}

export default RequestNew;