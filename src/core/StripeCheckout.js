import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/CartHelper';
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";

import {createOrder } from "./helper/orderHelper";


const StripeCheckout = ({
    products, 
    setReload = f => f,
    reload= undefined
}) => {

    const [data, setData] = useState({
        loading: false,
        success: false,
        error : "",
        address: "",
    });


    const token = isAutheticated() && isAutheticated().token;
    const userId = isAutheticated() && isAutheticated().user._id;

    const getFinalAmount = () => {
        let amount = 0;
        products.map(p=> {
            amount = amount + p.price;
        })
        
        return amount;
    };
    const makePayment = token => {
        const body = {
            token,
            products
        };
        const headers = {
            "Content-Type": "application/json"
        };
        return fetch(`${API}/stripepayment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            console.log(response)
            //call futher methods
            const {status} = response;
            console.log("STATUS", status);
            
        

        
            
        }).catch(error => console.log(error))
    };

     const showStripeButton = () => {
        return isAutheticated() ? (
            <StripeCheckoutButton
            stripeKey="pk_test_51ImhTrSJZ9xBKP3CcDW5WzbSAz8ef79ymSmPjUIHIQuwFkDVViCNCCqfRmKVAWEymT8JWCbQ5r3Oz2zdIvjfiuRo00Iz34iVJc"
            token={makePayment}
            amount={getFinalAmount() * 100}
            name="Buy Tshirts"
            shippingAddress
            billingAddress
            >
            <button className="btn btn-success">Pay with stripe</button>
            </StripeCheckoutButton>

        ) : (
            <Link to ="/signin">
                

                <button className="btn btn-warning">Signin</button>
            </Link>
        );
    };

    

    return (
        <div>
            <h3 className="text-white">Stripe Checkout {getFinalAmount()}</h3>
            {showStripeButton()}

        </div>
    );
};

export default StripeCheckout;