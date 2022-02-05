import React, { useEffect, useState } from 'react';
import "../css/Ad_ItemProduct.css";
import actionCreator  from "../../../redux/actions";
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { ToastContainer, toast } from 'react-toastify';

const Ad_ItemProduct = (props) => {
    const [product, setProduct] = useState({
        image: {
            data: {

            }
        }
    });

    useEffect(() => {
        setProduct(props.data)
       
    },[props])

    const removeProduct = (id, name) => {
        confirmAlert({
            title: 'Confirm to remove',
            message: 'Are you sure to remove ' + name,
            buttons: [
              {
                label: 'Yes',   
                onClick: async() => {
                    await props.removeProduct(id);
                    console.log(product)
                    await props.loadProducts(props.totalPage != props.currentPage? props.currentPage - 1: props.currentPage);
                    toast.success(`Remove successfully..!`, {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
              },
              {
                label: 'No',
                onClick: () => {
                    toast.warn('Cancel remove product...!', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
              }        
            ],
            closeOnClickOutside: false
        }); 
    }
    return product?<div className='Ad_ItemProduct'>
                    <ul>
                        <li>{product._id}</li>
                        <li className='image-product'>
                            <img src={product.image.data.url}></img>
                        </li>
                        <li className='name'>{product.name}</li>
                        <li className='price'>{product.current_price} vnd</li>
                        <li className=''>{product.brand}</li>
                        <li>Còn hàng</li>
                        <li>
                            <div className='group-btn'>
                            <button className='edit-btn'>
                                Edit
                                <img src="https://img.icons8.com/material-outlined/24/008000/edit--v1.png"/>
                            </button>
                            <button className='remove-btn' onClick={() => removeProduct(product._id, product.name)}>
                                Remove
                                <img src="https://img.icons8.com/small/16/FF0000/delete-forever.png"/>
                            </button>
                            </div>
                        </li>
                    </ul>
                </div>: <div>Chua co du lieu</div>
};

const mapStateToProps = (state, ownProps) => ({
    data_products: state,
})


export default connect(mapStateToProps,actionCreator)(Ad_ItemProduct) ;
