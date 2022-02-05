import React, { useEffect, useMemo, useState } from 'react'
import "../css/Ad_PDManage.css";
import Ad_ItemProduct from './Ad_ItemProduct';
import actionCreator  from "../../../redux/actions";
import { connect } from 'react-redux';
import disableScroll from 'disable-scroll';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import productAPI from '../../../api/productAPI';


const columns = [
    {
        name: "ID"
    },
    {
        name: "Image"
    },
    {
        name: "Name"
    },
    {
        name: "Price"
    },
    {
        name: "Brand"
    },
    {
        name: "Status"
    },
    {
        name: "Operation"
    }
]



const Ad_PDManage = (props) => {
   const [products, setProducts] = useState([]);
   const [isCreate, setIsCreate] = useState(false);
   const [categorys, setCategorys] = useState([])
   const [brands, setBrands] = useState([])
   const [totalPage, setTotalPage] = useState(0);
   const [currentPage, setCurrentPage] = useState(1);

   useEffect(() => {    
      props.loadProducts(1);
      props.loadCate();
      props.loadBrand();   
      getAllAmount();
   },[])


   useEffect(()=> {
        setProducts(props.data_products.productData)
        setCategorys(props.data_cate.resultData)
        setBrands(props.data_brand.resultData)
        getAllAmount();
        return () => {
         
        }
   },[props])

   const getAllAmount = async() => {
        let response = await productAPI.getAllAmount();
        let numberPage = Math.ceil(response / 8)
        setTotalPage(numberPage);
   }

   const createNewProduct = () => {
        setIsCreate(isCreate => !isCreate);
        if(isCreate === true)
            disableScroll.off();
        else 
            disableScroll.on();
    }

    const openToast = (text) => {
        console.log("aaaa")
        toast.success(`${text}`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const handlePageClick = (pageNumber) => {
        props.loadProducts(pageNumber.selected + 1)
        setCurrentPage(pageNumber.selected + 1);
    }

    const handleInputSearch = async (event) => {
        if(event.charCode === 13){
            var result = await productAPI.searchProducts(event.target.value)
            console.log(result)
        }

    }


    return (
        <div className='Ad_PDManage'>
            <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
            />
            <div className='container'>
                <div className='actions-menu'>
                    <div className='actions-container'>
                        <div className='create'>
                            <button className='create-btn' onClick={createNewProduct}>Create New</button>
                        </div>
                        <div className='filters'>
                            <div className="search-product">
                                <input placeholder='Find product with name...' type="text" onKeyPress={handleInputSearch}/>
                                <a className='icon-search'>
                                    <img src="https://img.icons8.com/ios-glyphs/60/000000/search--v1.png"/>
                                </a>
                            </div>
                            <select name="FW_cate" >
                                <option selected>All category</option>
                               {
                                    categorys.map(cate => {
                                        return <option value={cate.name}>
                                            {cate.name}
                                        </option>
                                    })
                               }
                            </select>
                            <select name="FW_Brand">
                                <option selected>All brand</option>
                                {
                                    brands.map(brand => {
                                        return <option value={brand.name}>
                                            {brand.name}
                                        </option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className='table-products'>
                    <div className='header-tb'>
                        <ul>
                            {
                                columns.map((item, index) => {
                                    return <li key={index}>{item.name}</li>
                                })
                            }
                        </ul>
                    </div>
                    <div className='main-tb'>
                        {
                            products.map((item, index) => {
                                return <Ad_ItemProduct 
                                    key={index} 
                                    data={item} 
                                    currentPage={currentPage} 
                                    totalPage={totalPage}
                                />
                            })
                            
                        }
                    </div>
                </div>
                <ReactPaginate
                    initialPage={0}
                    activeClassName="selectedPage"
                    breakLabel="..."
                    nextLabel=" >>"
                    onPageChange={handlePageClick}
                    pageCount={totalPage}
                    previousLabel="<< "
                    renderOnZeroPageCount={null}
                    pageRangeDisplayed={5}
                    className="paginate"
                />                                 
            </div>  
            <CreateNewFrom 
                handleHidden={createNewProduct}
                loadProducts={() => props.loadProducts(currentPage)}
                opened={isCreate}
                createProduct={props.createProduct}
                loadCate={props.loadCate}
                cateData={props.data_cate.resultData}
                brandData={props.data_brand.resultData}
                openToast={openToast}
                createCate={props.createCate}
                createBrand={props.createBrand}
                loadBrand={props.loadBrand}
            />
        </div>
    )
}


// form create product
const CreateNewFrom = (props) => {
    const initialFormData = Object.freeze({
        name: "",
        current_price: "",
        old_price: "",
        amount: "",
        description: "",
        discount: "",
        category: "",
        brand:"",
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
            props.openToast("successfully added product");
        }
        else {
            console.log("some thing wasn't wrong: ",response)
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
            props.openToast("successfully added category");
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
            props.openToast("successfully added brand");
            handleCreateNewBrand();
        }
        else {
            console.log("Something wasn't wrong...!", response.message)
        }
    }

    return <div className={`CreateNewFrom ${props.opened?"fade-up":"fade-out"}`}>
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
                            <select onChange={handleChange} name="category">
                                <option value="all" key="all-cate" disabled selected>Choose category</option>
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
                            <select onChange={handleChange} name="brand">
                                <option value="all" key="all-brand" disabled selected>Choose brand</option>
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
                            <input name="current_price" placeholder='Current price ...' type="number" value={formData.current_price} onChange={handleChange} required>
                            </input>
                            <input name="old_price" placeholder='Old price ...' type="number" value={formData.old_price} onChange={handleChange} required>
                            </input>
                            <input name="amount" placeholder='Amount ...' type="number" value={formData.amount} onChange={handleChange} required>
                            </input>
                            <input name="discount" placeholder='Discount ...' type="text" onChange={handleChange} required>
                            </input>
                        </div>
                    </div>
                    <div className='image'>
                        <input type="file" name="image" onChange={onImgChange} required></input>
                    </div>
                    <div className='description input-styled'>
                        <textarea  name="description" onChange={handleChange} value={formData.description} placeholder='Description....' required />       
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



const mapStateToProps = (state, ownProps) => ({
    data_products: state.products,
    data_cate: state.categorys,
    data_brand: state.brands
})



export default connect(mapStateToProps,actionCreator)(Ad_PDManage)
