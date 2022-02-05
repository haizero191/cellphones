import axios from "axios";



class BrandAPI {
    async getAllBrand() {
        try {
            let response = await axios.get(process.env.REACT_APP_API_ENDPOINT + `/brands/`)
            console.log(response)
            return response.data;
        }
        catch(error) {
            console.log("Some thing wasn't wrong...!", error)
        }
    }

    async createBrand(brandData) {
        try {
            var response = await axios({
                method: "post",
                url: process.env.REACT_APP_API_ENDPOINT + "/brands/create",
                data: brandData,
                headers: { "Content-Type": "application/json" },
            })
            return response;
        }catch(err) {
            console.log("Some thing wasn't wrong...!", err)
        }
    }

}


export default new BrandAPI();