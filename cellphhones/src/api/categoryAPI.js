import axios from "axios";



class CategoryAPI {
    async getAllCate() {
        try {
            let response = await axios.get(process.env.REACT_APP_API_ENDPOINT + `/categorys/`)
            return response.data;
        }
        catch(error) {
            console.log("Some thing wasn't wrong...!", error)
        }
    }

    async createCate(cateData) {
        try {
            var response = await axios({
                method: "post",
                url: process.env.REACT_APP_API_ENDPOINT + "/categorys/create",
                data: cateData,
                headers: { "Content-Type": "application/json" },
            })
            return response;
        }catch(err) {
            console.log("Some thing wasn't wrong...!", err)
        }
    }

}


export default new CategoryAPI();