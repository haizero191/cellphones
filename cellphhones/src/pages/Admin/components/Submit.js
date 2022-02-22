import React, { useEffect, useState } from 'react'
import '../css/submit.css';
import {Card, Form, Button} from 'react-bootstrap'
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import productAPI from '../../../api/productAPI';


function Submit(props) {
    const initialFormData = Object.freeze({
        name: "",
        current_price: "",
        old_price: "",
        amount: "",
        description: "",
        discount: "",
        category: "nothing",
        brand:"nothing"
    });
    var [isOpen, setIsOpen] = useState(true)
    var [formData, setFormData] = useState(initialFormData)
    const [images, setImages] = useState([]);



    // lang nghe props change
    useEffect(() => {
        setIsOpen(props.opened);     
        setFormData(props.dataProduct) 
    },[props])


    // dong form
    const closeForm = () => {
        props.editProduct();
    }

    // handle image changed
    const onImgChange = (event) => {
        setImages(
            event.target.files
        )
    }


    // xu li va luu du lieu nhap
    const handleChange = (e) => {
        console.log(formData)
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleUpdate = async(id) => {
        const bodyFormData = new FormData();
        bodyFormData.append('name', formData.name);
        bodyFormData.append('current_price', formData.current_price);
        bodyFormData.append('old_price', formData.old_price);
        bodyFormData.append('description', formData.description);
        bodyFormData.append('discount', formData.discount);
        bodyFormData.append('category', formData.category);
        bodyFormData.append('brand', formData.brand);
        console.log(!images[0])
        if(images[0])
            bodyFormData.append('image', images[0])
        await productAPI.updateProduct(id,bodyFormData)
        console.log(bodyFormData)
    }

    return (
        <div className={`submitPage ${isOpen? "open": ""}`}>
             <div className='close-editForm' onClick={closeForm}>
                <img src="https://img.icons8.com/ios/50/FFFFFF/delete-sign--v1.png"/>
            </div>
            <div className="submitPage-container d-flex justify-content-center">
                {/* <form action='http://26.83.215.211:4000/api/products/create' method='post' encType='multipart/form-data'> 
                </form> */}
                <Card style={{ minWidth:'800px', backgroundColor:'white' }}>
                    <Card.Body>
                        <h3 className='text-center '>Edit Product</h3>
                        <Form>
                            <Form.Group className='mb-3' controlId='formName'>
                                <Form.Control type='text' placeholder='Enter product name...' onChange={handleChange} name="name" value={formData.name}></Form.Control>
                            </Form.Group>
                            <Form.Group className="d-flex mb-3">
                                <Form.Select style={{width:'350px', marginRight:'4rem'}} 
                                    onChange={handleChange} 
                                    defaultValue="Tai nghe" 
                                    name="category"
                                >
                                    <option>Choose Category</option>
                                    {
                                        props.cateData.map(item => {
                                            return <option value={item.name} selected={props.dataProduct.category === item.name?true:false}>{item.name}</option>
                                        })
                                    }
                                    
                                </Form.Select>
                                <Form.Select style={{width:'350px'}}>
                                    <option>Choose Brand</option>
                                    {
                                        props.brandData.map(item => {
                                            return <option value={item.name} selected={props.dataProduct.brand === item.name?true:false}>{item.name}</option>
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className='d-flex mb-3'>
                                <Form.Control 
                                    style={{width:'160px', marginRight:'2.55rem'}} 
                                    type='text' 
                                    placeholder='Current price...'
                                    onChange={handleChange}
                                    value={formData.current_price}
                                    name="current_price"
                                >
                                </Form.Control>

                                <Form.Control 
                                    style={{width:'160px', marginRight:'2.55rem'}} 
                                    type='text' placeholder='Old price...'
                                    onChange={handleChange}
                                    value={formData.old_price}
                                    name="old_price"
                                >
                                </Form.Control>

                                <Form.Control 
                                    style={{width:'160px', marginRight:'2.55rem'}} 
                                    type='number' 
                                    placeholder='Amouth...'
                                    onChange={handleChange}
                                    value={formData.amount}
                                    name="amount"
                                >
                                </Form.Control>

                                <Form.Control 
                                    style={{width:'160px'}} 
                                    type='text' 
                                    placeholder='Discount...'
                                    onChange={handleChange}
                                    value={formData.discount}
                                    name="discount"
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='formFile' className='mb-3'>
                                <Form.Label>Picture:</Form.Label>
                                <Form.Control type='file' name="image" onChange={onImgChange}/>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Control type='text' placeholder='Decription...' as="textarea" rows="3"></Form.Control>
                            </Form.Group>
                            <Button variant='primary'style={{width: '100px', float:'right'}} onClick={() => handleUpdate(props.dataProduct._id)}>Lưu</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default Submit
