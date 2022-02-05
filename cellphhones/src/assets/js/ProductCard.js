import React from 'react'
import '../css/product_card.css'
function ProductCard(props) {
    return (
        <div className="product-item">
            <div className="product-item__box">
                <div className={props.discount && "product-item__sticker"}>
                    {props.discount}
                </div>
                <div className="product-item__img">
                    <img src={props.image} alt='' style={{height:'160px'}}/>
                </div>
                <div className="product-item__name">
                    {props.name}
                </div>
                <div className="product-item__price">
                    <p className="current-price">{props.current_price}</p>
                    <p className="old-price">{props.old_price}</p>
                </div>
                {props.description && 
                    <div className="product-item__description">
                        <p style={{padding:'0.5em'}}>{props.description}</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default ProductCard
