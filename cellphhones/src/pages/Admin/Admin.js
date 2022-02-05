import React, { useEffect } from "react";
import Ad_LeftSideBar from "./components/Ad_LeftSideBar";
import Ad_TopBar from "./components/Ad_TopBar";
import { useLocation } from "react-router-dom";
import Ad_PDManage from "./components/Ad_PDManage";
import "./css/Admin.css";


const Admin = (props) => {
    const search = useLocation().search;
    const view = new URLSearchParams(search).get('view');
    var url = window.location.pathname.split("/");

    const renderView = () => {
        if(url.length > 2)
            switch(url[2].toLowerCase()) {
                case 'products': 
                {
                    if(view === "product management")
                        return <Ad_PDManage/>;
                    else if(view === "statistics")
                        return "statistics"
                    else 
                        return "can't find data"
                }
                case 'orders': 
                {
                    if(view === "order management")
                        return "order management";
                    else if(view === "statistics")
                        return "statistics"
                    else 
                        return "can't find data"
                }
                default: return ""
        }
    }

    return <div className="Admin" style={{minWidth: "1200px!important"}}>
        <Ad_TopBar select={url[2]} view={view}/>
        <div className="main">
            <Ad_LeftSideBar/>
            <div className="main-container">
              {
                  renderView()
              }
            </div>
        </div>
    </div>
}




export default React.memo(Admin);


