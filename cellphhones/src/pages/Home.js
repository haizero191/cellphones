import React from 'react'

import'./home.css'
import ProductTitle from '../assets/js/ProductTitle'
import ProductBox from '../assets/js/ProductBox'
import BannerBottom from '../assets/js/BannerBottom'
import {PhoneData} from '../assets/js/PhoneData'
import {LaptopData} from '../assets/js/LaptopData'
import {SliderData} from '../assets/js/SliderData'
import CategoryMenu from '../assets/js/CategoryMenu'
import Slider from '../assets/js/Slider'
import SubBanner from '../assets/js/SubBanner'
import bannerRight from '../assets/images/banner-right.png'
import bannerRight2 from '../assets/images/banner-right2.png'
import bannerRight3 from '../assets/images/banner-right3.png'
function Home() {
    return (
        <div className="homePage">
            <div className="home-container">
                <div className="home-header">
                    <div className='category-menu'>
                        <CategoryMenu/>
                    </div>
                    <div className='main-banner'>
                        <Slider slides={SliderData}/>
                    </div>
                    <div className='sub-banner'>
                        <SubBanner src={bannerRight}/>
                        <SubBanner src={bannerRight2}/>
                        <SubBanner src={bannerRight3}/>
                    </div>
                </div>
                <div className='product-container margin-15'>
                   <ProductTitle title='ĐIỆN THOẠI NỔI BẬT NHẤT'
                        brand={[
                            {name:'Apple'},
                            {name:'Samsung'},
                            {name:'Xiaomi'},
                            {name:'Vsmart'},
                            {name:'Realme'},
                            {name:'Vivo'},
                            {name:'ASUS'},
                            {name:'Nokia'},
                        ]}
                   />
                   <div className='product-list'>
                        <ProductBox Data={PhoneData}/>
                   </div>
                   <ProductTitle title='Laptop mới nổi'
                        brand={[
                            {name:'Mac'},
                            {name:'ASUS'},
                            {name:'Hp'},
                            {name:'Microsoft Surface'},
                            {name:'MSI'},
                            {name:'Dell'},
                        ]}
                   />
                   <div className='product-list'>
                        <ProductBox Data={LaptopData}/>
                   </div>
                   <ProductTitle title='CHUYÊN TRANG THƯƠNG HIỆU'/>
                   <BannerBottom/>
                </div>
            </div>
        </div>
    )
}

export default Home
