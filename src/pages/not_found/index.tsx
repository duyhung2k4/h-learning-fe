import React from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";

const NotFound: React.FC = () => {
    return (
        <div className="container">
            <div className="section">
                <h1 className="error text">404</h1>
                <div className="page">Lỗi!!! Trang này không tồn tại</div>
                <NavLink className="back-home text" to="/">Trở về trang chủ</NavLink>
            </div>
        </div>
    )
}

export default NotFound;