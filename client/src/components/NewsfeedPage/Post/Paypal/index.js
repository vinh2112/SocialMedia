import React , {useRef,useEffect}from 'react';
import {PaypalContainer} from './PaypalElement';
import {useHistory} from 'react-router-dom';
import {PaymentAPI} from 'api';
import { saveAs } from "file-saver";

const Paypal = (post) => {
    const history = useHistory()
    const paypal = useRef()
    useEffect(()=> {
        window.paypal.Buttons({
        createOrder:(data,actions)=>{
            return actions.order.create({
                purchase_units: [{
                    description: "abc",
                    amount:{
                        currency_code:"USD",
                        value: post.post.post.price,
                    }
                }]
                
            })

        },
        onApprove: async (data,actions) =>{
            const order = await actions.order.capture()
            console.log(post.post.post._id)
            PaymentAPI.createPayment({
                postId: post.post.post._id,
                postBody: {
                 price: post.post.post.price,
                 isSuccess: true
                }
               })
            saveAs(post.post.post.image.url, `${post.post.post.image.public_id}.png`)
            history.push('/')
            console.log(order)
        },
        onError: (err) =>{
            console.log(err)
        },
        }).render(paypal.current)
    })
    return (
        <PaypalContainer ref={paypal}>

        </PaypalContainer>
    )
}

export default Paypal
