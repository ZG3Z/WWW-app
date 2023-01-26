import React from 'react';
import { getCustomersApiCall } from '../../apiCalls/customerApiCalls';
import CustomerListTable from '../table/CustomerListTable';

class CustomerList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            customers: []
        }
    }

    componentDidMount() {
        this.fetchCustomerList();
    }

    fetchCustomerList = () => {
        getCustomersApiCall()
        .then(res => res.json())
        .then(
            (data) => {
                this.setState({
                    isLoaded: true,
                    customers: data
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        );
      
    }

    render(){
        const{error, isLoaded, customers} = this.state;
        let content;

        if(error) {
            content = <p>Error: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Loading...</p>
        } else {
            content = <CustomerListTable customerList={customers.slice(1,customers.length)}/>;
        }

        return (
            <main>
                {content}
             </main>
        )
    }
}

export default CustomerList;