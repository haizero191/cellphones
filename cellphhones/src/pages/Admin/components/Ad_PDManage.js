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
import FullPageLoader from './FullPageLoader';
import FormCreate from './FormCreate';
import Submit from './Submit';

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
        name: "Category"
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
    const initialFilterData = {
        name: "",
        cate: "",
        brand: ""
    };
   const [products, setProducts] = useState([]);
   const [isCreate, setIsCreate] = useState(false);
   const [categorys, setCategorys] = useState([]);
   const [brands, setBrands] = useState([]);
   const [totalPage, setTotalPage] = useState(0);
   const [currentPage, setCurrentPage] = useState(1);
   const [filterData, setFilterData] = useState(initialFilterData);
   const [isEdit, setIsEdit] = useState(false);
   const [editFormData, setEditFormData] = useState({})

    useEffect(() => {    
        props.loadProducts(filterData, 0);
        //console.log(filterData)
        // test(filterData, 0);
        props.loadCate();
        props.loadBrand();   
        getAllAmount();
    },[])

    // listen to change props
    useEffect(()=> {
            setProducts(props.data_products.resultData)
            setCategorys(props.data_cate.resultData)
            setBrands(props.data_brand.resultData)
            setEditFormData(props.data_detail.resultData);
            getAllAmount();
            console.log(props.isLoading)
            return () => {
            
            }
    },[props])

    //listen to change filter
    useEffect(() => {
        onChangePress();
    },[filterData])


    // dem tat ca so san pham
    const getAllAmount = async() => {
        let response = await productAPI.getAllAmount();
        let numberPage = Math.ceil(response / 8)
        setTotalPage(numberPage);
    }


    // mo bang tao moi san pham
    const createNewProduct = () => {
        setIsCreate(isCreate => !isCreate);
        if(isCreate === true)
            disableScroll.off();
        else 
            disableScroll.on();
    }


    // mo bang chinh sua chi tiet
    const editProduct = () => {
        setIsEdit(isEdit => !isEdit);
        if(isCreate === true)
            disableScroll.off();
        else 
            disableScroll.on();
    }


    // xu li khi click chi tiet
    const handleEditProduct = async(id) => {
        console.log(id);
        if(id) {
            props.loadDetailProduct(id);
        }
        editProduct();
    }


    // mo toast type = success
    const openToastSuccess = (text) => {
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

    // mo toast type = error
    const openToastError = (text) => {
        toast.error(`${text}`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }


    // xu li chuyen trang
    const handlePageClick = (pageNumber) => {
        props.loadProducts(filterData, pageNumber.selected + 1)
        setCurrentPage(pageNumber.selected + 1);
    }

    // xu li filter
    const handleChangeFilter = (event) => {
        let {name, value} = event.target;
        setFilterData({
            ...filterData,
            [event.target.name]: event.target.value
        })      
    }

    const onChangePress = async() => {
        var result = await productAPI.searchProducts(filterData, 0);
        setProducts(result)
    }

    // xu li go phim 
    const handleInputSearch = async(event) => {
        if(event.charCode === 13){
            var result = await productAPI.searchProducts(filterData, 0);
            setProducts(result)
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
            <FullPageLoader isLoading={props.isLoading}/>
            <div className='container'>
                <div className='actions-menu'>
                    <div className='actions-container'>
                        <div className='create'>
                            <button className='create-btn' onClick={createNewProduct}>Create New</button>
                        </div>
                        <div className='filters'>
                            <div className="search-product">
                                <input 
                                    placeholder='Find product with name...' 
                                    type="text" 
                                    onKeyPress={handleInputSearch} 
                                    onChange={handleChangeFilter}
                                    name="name"
                                />
                                <a className='icon-search'>
                                    <img src="https://img.icons8.com/ios-glyphs/60/000000/search--v1.png"/>
                                </a>
                            </div>
                            <select name="FW_cate" name="cate" onChange={handleChangeFilter}>
                                <option selected value="">All category</option>
                               {
                                    categorys.map((cate,index) => {
                                        return <option value={cate.name} key={index}>
                                            {cate.name}
                                        </option>
                                    })
                               }
                            </select>
                            <select name="FW_Brand" name="brand" onChange={handleChangeFilter}>
                                <option selected value="">All brand</option>
                                {
                                    brands.map((brand,index) => {
                                        return <option value={brand.name} key={index}>
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
                                    filterData={filterData}
                                    handleClick={handleEditProduct}
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
            <FormCreate
                handleHidden={createNewProduct}
                loadProducts={() => props.loadProducts(filterData, currentPage)}
                opened={isCreate}
                createProduct={props.createProduct}
                loadCate={props.loadCate}
                cateData={props.data_cate.resultData}
                brandData={props.data_brand.resultData}
                openToastSuccess={openToastSuccess}
                openToastError={openToastError}
                createCate={props.createCate}
                createBrand={props.createBrand}
                loadBrand={props.loadBrand}
            />
            <Submit 
                opened={isEdit}
                editProduct={handleEditProduct}
                dataProduct={editFormData}
                cateData={props.data_cate.resultData}
                brandData={props.data_brand.resultData}
            />     
        </div>
    )
}


const mapStateToProps = (state, ownProps) => ({
    data_products: state.products,
    data_cate: state.categorys,
    data_brand: state.brands,
    data_detail: state.details,
    isLoading: state.products.loading
})



export default connect(mapStateToProps,actionCreator)(Ad_PDManage)
