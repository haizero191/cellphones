import axios from "axios";
import {initPerpage} from "./config";

class ProductAPI {

    // lấy danh sách sản phẩm
    async getProducts(page, perpage) {
        console.log(perpage)
        if(page)
            try {
                // set init value for perpage if perpage = underfine
                if(perpage === undefined)
                    perpage = initPerpage
                    console.log(perpage)
                // call api get products
                let response = await axios.get(process.env.REACT_APP_API_ENDPOINT + `/products?perpage=${perpage}&page=${page}`)
                return response.data;

            }catch(error) {
                console.log("Some thing wasn't wrong...!", error)
            } 
        else {
            return {message: "somthing wasn't wrong"}
        }
    }


    // lấy tổng sản phẩm từ server
    async getAllAmount() {
        try {
            let response = await axios.get(process.env.REACT_APP_API_ENDPOINT + `/products`)
            return response.data.length;

        }catch(error) {
            console.log("Some thing wasn't wrong...!", error)
        }
    }


    // lấy chi tiết sản phẩm 
    async getDetailProduct(id) {
        try {
            let  response = await axios.get(process.env.REACT_APP_API_ENDPOINT + `/products?id=${id}`)
            return response;
        }catch(error) {
            console.log("Some thing wasn't wrong...!", error)
        }
    }

    // xóa sản phẩm theo id
    async removeProduct(id) {
        if(id) 
            try {
                let response = await axios.post(process.env.REACT_APP_API_ENDPOINT + `/products/remove?id=${id}`)
            }
            catch(error) {
                console.log("Some thing wasn't wrong...!", error)
            }
    }

    // tạo mới sản phẩm
    async createProduct(productData) {
        var response = await axios({
            method: "post",
            url: process.env.REACT_APP_API_ENDPOINT + "/products/create",
            data: productData,
            headers: { "Content-Type": "multipart/form-data" },
        })
        return response;
    }

    async searchProducts(name) {
        if(name)
            try {
                var response = await axios({
                    method: "get",
                    url: process.env.REACT_APP_API_ENDPOINT + "/products/search",
                    params: {name,page: "1"}
                })
                return response;
            }catch(error) {
                console.log("Can't find products...! please check again")
            }
    }
}


export default new ProductAPI();