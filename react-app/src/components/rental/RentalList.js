import React from 'react';
import { getRentalsApiCall } from '../../apiCalls/rentalApiCalls';
import RentalListTable from '../table/RentalListTable';
import { userId  } from '../../helpers/authHelper';

class RentalList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            rentals: [],
            user: props.user
        }
    }

    componentDidMount() {
        this.fetchRentalList();
    }

    fetchRentalList = () => {
        getRentalsApiCall()
        .then(res => res.json())
        .then(
            (data) => {
                this.setState({
                    isLoaded: true,
                    rentals: data
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
        const{error, isLoaded, rentals} = this.state;
        let content;
        
        if(error) {
            content = <p>Error: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Loading...</p>
        } else if(userId()==1){
            content = <RentalListTable rentalList={rentals}/>;
        } else{
            content = <RentalListTable rentalList={rentals.filter(x => x.Customer_ID_customer==userId())}/>;
        }

        return (
            <main>
                {content}
             </main>
        )
    }
}

export default RentalList;