import {  useParams } from "react-router-dom";
import CustomerForm from "./CustomerForm";

export default function CustomerUpdate() {
    let { customerId } = useParams();
    customerId = parseInt(customerId);
    return (
       <CustomerForm id={customerId}/>
    )
}