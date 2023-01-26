import {  useParams } from "react-router-dom";
import RentalForm from "./RentalForm";

export default function RentalUpdate() {
    let { rentalId } = useParams();
    rentalId = parseInt(rentalId);
    return (
       <RentalForm id={rentalId}/>
    )
}