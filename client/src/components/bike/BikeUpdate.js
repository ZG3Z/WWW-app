import {  useParams } from "react-router-dom";
import BikeForm from "./BikeForm";

export default function BikeUpdate() {
    let { bikeId } = useParams();
    bikeId = parseInt(bikeId);
    return (
       <BikeForm id={bikeId}/>
    )
}