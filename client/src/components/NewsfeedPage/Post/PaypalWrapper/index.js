import React from 'react'
import Paypal from '../Paypal'
import {PaypalContainer} from './PaypalWrapperElements'
import {useLocation} from 'react-router-dom'

const PaypalWrapper = () => {
    const post = useLocation();
    console.log(post.state)
    return (
        <PaypalContainer>
            <Paypal post={post.state}/>
        </PaypalContainer>
    )
}

export default PaypalWrapper
