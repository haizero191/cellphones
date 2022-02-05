import React, {useState, useEffect, useRef} from 'react'
import {SliderData} from './SliderData'
import '../themify-icons/themify-icons.css';
import '../css/slider.css'

function Slider({slides}) {
    const [current, setCurrent] = useState(0);
    const length = slides.length
    const loop = useRef()

    useEffect(() => {
        loop.current = setInterval(() => {
            setCurrent(current === length - 1 ? 0 : current + 1)
        }, 2000)

        return () => {
            clearInterval(loop.current)
        }
    })

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
    }
    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
    }
    
    if (!Array.isArray(slides) || slides.length <=0) {
        return null
    }

    return (
        <div>
            <div className='slider'>
                <i className='ti-angle-left left-arrow arrow' onClick={prevSlide}/>
                <i className='ti-angle-right right-arrow arrow' onClick={nextSlide}/>
                {SliderData.map((slide, index) => {
                    return (
                        <div className={
                                index === current 
                                ? 'banner-section active' 
                                : 'banner-section'}
                            key={index}
                        >
                            <img src={slide.image} alt='Banner' style={{width:'700px', borderTopLeftRadius:'1rem', borderTopRightRadius:'1rem'}}/>
                        </div>
                    )
                })}
            </div>
            <div className="swipper">
                <div className={
                    current === 0 ? 'swipper-item active' : 'swipper-item'}
                    onClick={() => {
                        setCurrent(0)
                    }}
                >
                    ITEM 1
                    <br/>
                    Description 1
                </div>
                <div className={
                    current === 1 ? 'swipper-item active' : 'swipper-item'}
                    onClick={() => {
                        setCurrent(1)
                    }}
                >
                    ITEM 2
                    <br/>
                    Description 2
                </div>
                <div className={
                    current === 2 ? 'swipper-item active' : 'swipper-item'}
                    onClick={() => {
                        setCurrent(2)
                    }}
                >
                    ITEM 3
                    <br/>
                    Description 3
                </div>
                <div className={
                    current === 3 ? 'swipper-item active' : 'swipper-item'}
                    onClick={() => {
                        setCurrent(3)
                    }}
                >
                    ITEM 4
                    <br/>
                    Description 4
                </div>
                <div className={
                    current === 4 ? 'swipper-item active' : 'swipper-item'}
                    onClick={() => {
                        setCurrent(4)
                    }}
                >
                    ITEM 5
                    <br/>
                    Description 5
                </div>
            </div>
        </div>
    )
}

export default Slider
