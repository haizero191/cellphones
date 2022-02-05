import React from 'react'
import '../css/product_title.css'

function ProductTitle({title, brand}) {
    if (!Array.isArray(brand) || brand.length <=0) {
        return (
            <div className='product-title-box'>
                <div className='product-title-section'>
                    <a href="/" className='product-title'>
                        {title}
                    </a>
                </div>
            </div>
        )
    }
    
    return (
        <div className='product-title-box'>
            <div className='product-title-section'>
                <a href="/" className='product-title'>
                    {title}
                </a>
                <div className='brand-name'>
                    {brand.map((prop, index) => {
                        return (
                            <a key={index} href="/" className='btn-s'>{prop.name}</a>
                        )
                    })}
                    <a href="/" className='btn-s'>Xem tất cả</a> 
                </div>
            </div>
        </div>
    )
}

export default ProductTitle
