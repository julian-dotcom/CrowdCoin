import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Link } from '../../../routes';
import { Button } from 'semantic-ui-react';

class RequestIndex extends Component {
    static async getInitialProps(props) {
        return { 
            address: props.query.address
        }
    }
    render() {
        return (
            <Layout>
                <h3>Request</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary>Add request</Button>
                    </a>
                </Link>
            </Layout>
        );
    }
}

export default RequestIndex;