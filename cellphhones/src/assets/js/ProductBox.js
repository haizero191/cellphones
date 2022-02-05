import React from 'react'
// import {PhoneData} from './PhoneData'
import ProductCard from './ProductCard'

function ProductBox({Data}) {
    return (
        <div>
            {Data.map((phone, index) => {
                return (
                    <ProductCard 
                        key={index}
                        image = {phone.image}
                        name = {phone.name}
                        current_price = {phone.current_price}
                        old_price = {phone.old_price}
                        description = {phone.description}
                        discount = {phone.discount}/>
                )
            })}
        </div>
    )
}

export default ProductBox
