import React from 'react'
import '../css/footer.css'

function Footer() {
    return (
        <div className="footer">
            <div className="col">
                <ul style={{listStyle: 'none'}}>
                    <li style={{fontSize:'16px', fontWeight:'bold'}}>Tìm cửa hàng</li>
                    <li>Tìm cửa hàng gần nhất</li>
                    <li>Mua hàng từ xa</li>
                    <li style={{color: 'red'}}>Gặp trực tiếp cửa hàng gần nhất<br/> (Zalo hoặc gọi điện)</li>
                </ul>
            </div>
            <div className="col">
                <ul style={{listStyle: 'none'}}>
                    <li>Gọi mua hàng: <span style={{fontWeight:'bold'}}>1800.2097</span> (8h00 - 22h00)</li>
                    <li>Gọi khiếu nại: <span style={{fontWeight:'bold'}}>1800.2093</span> (8h00 - 21h30)</li>
                    <li>Gọi bảo hành: <span style={{fontWeight:'bold'}}>1800.2094</span> (8h00 - 21h00)</li>
                    
                </ul>
            </div>
            <div className="col">
                <ul style={{listStyle: 'none'}}>
                    <li>Mua hàng và thanh toán Online</li>
                    <li>Mua hàng trả góp Online</li>
                    <li>Tra thông tin đơn hàng</li>
                    <li>Tra điểm Smember</li>
                </ul>
            </div>
            <div className="col">
                <ul style={{listStyle: 'none'}}>
                    <li>Quy chế hoạt động</li>
                    <li>Chính sách Bảo hành</li>
                    <li>Liên hệ hợp tác kinh doanh</li>
                    <li>Đơn Doanh nghiệp</li>
                </ul>
            </div>
            <div className="footer__bottom">

            </div>
        </div>
    )
}

export default Footer
