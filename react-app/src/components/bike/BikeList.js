import React from 'react';
import { getBikesApiCall } from '../../apiCalls/bikeApiCalls';
import BikeListTable from '../table/BikeListTable';

class BikeList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            bikes: []
        }
    }

    componentDidMount() {
        this.fetchBikeList();
    }

    fetchBikeList = () => {
        getBikesApiCall()
        .then(res => res.json())
        .then(
            (data) => {
                this.setState({
                    isLoaded: true,
                    bikes: data
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
        const{error, isLoaded, bikes} = this.state;
        let content;
        
        if(error) {
            content = <p>Error: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Loading...</p>
        } else {
            content = <BikeListTable bikeList={bikes}/>;
        }

        return (
            <main>
                {content}
             </main>
        )
    }
}

export default BikeList;