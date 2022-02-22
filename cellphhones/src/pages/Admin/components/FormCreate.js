import { useState, useEffect } from "react";
import "../css/Form.css";

const FormCreate = (props) => {
    const initialFormData = Object.freeze({
        name: "",
        current_price: "",
        old_price: "",
        amount: "",
        description: "",
        discount: "",
        category: "nothing",
        brand:"nothing",
        image: "",
    });

    const [categorys, setCategorys] = useState([])
    const [formData, setFormData] = useState(initialFormData)
    const [images, setImages] = useState([]);
    const [isCreateCate, setIsCreateCate] = useState(false);
    const [brands, setBrands] = useState([])
    const [isCreateBrand, setIsCreateBrand] = useState(false);


    useEffect(() => {
        props.loadCate();
        props.loadBrand();
    },[])

    useEffect(() => {
       setCategorys(props.cateData)
       setBrands(props.brandData)
       
       return () => {
         
       }
    },[props])

    // handle close form 
    const closeForm = () => {
        props.handleHidden();
    }


    // handle submit form 
    const handleSubmitForm = (event) => {
        event.preventDefault();
        const bodyFormData = new FormData();
        bodyFormData.append('name', formData.name);
        bodyFormData.append('current_price', formData.current_price);
        bodyFormData.append('old_price', formData.old_price);
        bodyFormData.append('description', formData.description);
        bodyFormData.append('discount', formData.discount);
        bodyFormData.append('category', formData.category);
        bodyFormData.append('brand', formData.brand);
        bodyFormData.append('image', images[0])
        postCreateNew(bodyFormData)
    }


    // listen change image 
    const onImgChange = (event) => {
        setImages(
            event.target.files
        )
    }


    //post product to server 
    const postCreateNew = async(bodyFormData) => {
        var response = await props.createProduct(bodyFormData)
        if(response.data.success){
            props.loadProducts();
            setFormData(initialFormData);
            closeForm();
            props.openToastSuccess("successfully added product");
        }
        else {
            var error = response.data.success;
            var messageError = response.data.message;        
            props.openToastError(messageError)
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    // add Cate to DB
    const handleCreateNewCate = ()  => {
        setIsCreateCate(isCreateCate => !isCreateCate);
    }
    const createNewCate = async(cateData) => {
        var response = await props.createCate(cateData)
        if(response.data.success){
            props.loadCate();
            props.openToastSuccess("successfully added category");
            handleCreateNewCate();
        }
        else {
            console.log("Something wasn't wrong...!", response.message)
        }
    }

    // add brand to DB
    const handleCreateNewBrand = () => {
        setIsCreateBrand(isCreateBrand => !isCreateBrand);
    }

    const createNewBrand = async(brandData) => {
        var response = await props.createBrand(brandData)
        if(response.data.success){
            props.loadBrand();
            props.openToastSuccess("successfully added brand");
            handleCreateNewBrand();
        }
        else {
            console.log("Something wasn't wrong...!", response.message)
        }
    }

    return <div className={`FormCreate ${props.opened?"fade-up":"fade-out"}`}>
        <div className={`container `}>
            <div className='close-form' onClick={closeForm}>
                <img src="https://img.icons8.com/ios/50/FFFFFF/delete-sign--v1.png"/>
            </div>
            <div className='form-create'>
                <div className='title'>
                    <h2>Create New Product</h2>
                </div>

                <form 
                    encType='multipart/form-data'
                    onSubmit={handleSubmitForm}
                >
                    <div className='name-input input-styled' >
                        <input type="text" placeholder='Product name...' name="name" value={formData.name} onChange={handleChange} required/>
                    </div>



                    <div className='select-group'>
                        {/* // input to brand name */}
                        <div className='category-input'>
                            <select onChange={handleChange} name="category" value={formData.category}>
                                <option value="nothing" key="all-cate" selected disabled>Choose category</option>
                                {
                                    categorys.map((item, index) => {
                                        return <option key={item._id} value={item.name}>{item.name}</option>
                                    })
                                }
                            </select>
                            <div className='newCate' onClick={handleCreateNewCate}>
                                {
                                    isCreateCate?<img src="https://img.icons8.com/office/40/000000/minus.png"/>:<img src="https://img.icons8.com/officel/40/000000/add--v2.png"/>
                                }
                                
                            </div>
                            {
                                isCreateCate?<div className='toast-create fade-in-width'>
                                                    <SmallFieldInput 
                                                        textFor="Category name..."
                                                        createFunc={createNewCate}
                                                    />
                                            </div>:<div></div>
                            }
                        </div>
                        {/* // input to brand name */}
                        <div className='brand-input'>
                            <select onChange={handleChange} name="brand" value={formData.brand}>
                                <option value="nothing" key="all-brand" selected disabled>Choose brand</option>
                                {
                                    brands.map((item, index) => {
                                        return <option key={item._id} value={item.name}>{item.name}</option>
                                    })
                                }
                            </select>
                            <div className='newBrand' onClick={handleCreateNewBrand}>
                                {
                                    isCreateBrand?<img src="https://img.icons8.com/office/40/000000/minus.png"/>:<img src="https://img.icons8.com/officel/40/000000/add--v2.png"/>
                                }
                            </div>
                            {
                                isCreateBrand?<div className='toast-create fade-in-width'>
                                                    <SmallFieldInput 
                                                        textFor="Brand name..."
                                                        createFunc={createNewBrand}
                                                    />
                                            </div>:<div></div>
                            }
                        </div>
                    </div>

                    <div className='input-group input-styled sm-input'>
                        <div className='row'>
                            <div className="current_price">
                                <input name="current_price" placeholder='Current price ...' type="number" value={formData.current_price} onChange={handleChange} required>
                                </input>
                            </div>
                            <div className="old_price">
                                <input name="old_price" placeholder='Old price ...' type="number" value={formData.old_price} onChange={handleChange} required>
                                </input>
                            </div>
                            <div className="amount">
                                <input name="amount" placeholder='Amount ...' type="number" value={formData.amount} onChange={handleChange} required>
                                </input>
                            </div>
                            <div className="discount">
                                <input name="discount" placeholder='Discount ...' type="text" onChange={handleChange} required>
                                </input>
                            </div>
                        </div>
                    </div>
                    <div className='image'>
                        <input type="file" name="image" onChange={onImgChange} required></input>
                    </div>
                    <div className='description input-styled'>
                        <textarea  name="description" onChange={handleChange} value={formData.description} placeholder='Description....' />       
                    </div>
                    <div className="btn-submit">
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
}

const SmallFieldInput = ({createFunc, textFor}) => {
    const [value, setValue] = useState("");

    const hanleCreateNew = () => {
        createFunc({name: value})
    }
    const hanleChangeValue = (event) => {
        setValue(event.target.value)
    }
    return <div className='SmallFieldInput '>
                <input 
                    className='input-value'
                    type="text"
                    placeholder={textFor}
                    onChange={hanleChangeValue}
                ></input>
            <div className='create-btn' onClick={hanleCreateNew}>
                save
            </div>
    </div>
}

export default FormCreate;