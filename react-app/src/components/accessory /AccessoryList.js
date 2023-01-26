import React from 'react';
import { getAccessoriesApiCall } from '../../apiCalls/accessoryApiCalls';
import AccessoryListTable from '../table/AccessoryListTable';

class AccessoryList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            accessories: []
        }
    }

    componentDidMount() {
        this.fetchAccessoryList();
    }

    fetchAccessoryList = () => {
        getAccessoriesApiCall()
        .then(res => res.json())
        .then(
            (data) => {
                this.setState({
                    isLoaded: true,
                    accessories: data
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    render(){
        const{error, isLoaded, accessories} = this.state;
        let content;
        
        if(error) {
            content = <p>Error: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Loading...</p>
        } else {
            content = <AccessoryListTable accessoryList={accessories}/>;
        }

        return (
            <main>
                {content}
             </main>
        )
    }
}

export default AccessoryList;