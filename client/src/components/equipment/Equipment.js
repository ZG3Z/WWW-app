import {  useParams } from "react-router-dom";
import EquipmentForm from "./EquipmentForm";

export default function Equipment() {
    let { bikeId } = useParams();
    bikeId = parseInt(bikeId);
    return (
       <EquipmentForm id={bikeId}/>
    )
}