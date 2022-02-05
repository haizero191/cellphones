import React from "react";
import "../css/Ad_LeftSideBar.css";
import Ad_LeftSideBar_ListItem from "./Ad_LeftSideBar_ListItem";


const data = [
    {
        name: "Shipment",
        icon: "https://img.icons8.com/ios/50/000000/in-transit--v1.png",
        children: [
            {
                childName: "nothing",
                to: ""
            }
        ]
    },
    {
        name: "Orders",
        icon: "https://img.icons8.com/ios/50/000000/purchase-order.png",
        children: [
            {
                childName: "Order management",
                to: ""
            },
            {
                childName: "Statistics",
                to: ""
            }
        ]
    },
    {
        name: "Products",
        icon: "https://img.icons8.com/ios/50/000000/phone-case.png",
        children: [
            {
                childName: "Product management",
                to: ""
            },
            {
                childName: "Statistics",
                to: ""
            }
        ]
    },
    {
        name: "Viewer",
        icon: "https://img.icons8.com/fluency-systems-regular/48/000000/visible.png",
        children: [
            {
                childName: "Viewer management",
                to: ""
            },
            {
                childName: "Statistics",
                to: ""
            }
        ]
    },
    {
        name: "Feedback",
        icon: "https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-feedback-feedback-those-icons-lineal-those-icons.png",
        children: [
            {
                childName: "Feedback management",
                to: ""
            },
            {
                childName: "Statistics",
                to: ""
            }
        ]
    },
    {
        name: "Setting",
        icon: "https://img.icons8.com/windows/32/000000/settings--v1.png",
        children: [
            {
                childName: "Profile setting",
                to: ""
            },
            {
                childName: 'logout',
                to: ""
            }
        ]
    },
]


const Ad_LeftSideBar = () => {
    return <div className="Ad_LeftSideBar">
        <div className="container">
            <div className="menu">
                <ul>
                    {
                        data.map((item, index) => {
                            return  <li key={index}>
                                        <Ad_LeftSideBar_ListItem data={item}/>
                                    </li>
                        })
                    }
                </ul>
            </div>
        </div>
    </div>
}

export default Ad_LeftSideBar;