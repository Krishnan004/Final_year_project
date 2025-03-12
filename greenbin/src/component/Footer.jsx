import React from 'react'
import logo from '../assets/GreenBin_logo_transparent-removebg-preview.png';
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";
import "../css/footer.css"


const Footer = () => {
    return (
        <div class="footer">
            <div>
                <img src={logo} class="logo" />
            </div>
            <div class="network">
                <nav><FaSquareInstagram /></nav>
                <nav><FaSquareFacebook /></nav>
                <nav><FaSquareInstagram /></nav>
                <nav><FaSquareFacebook /></nav>
            </div>
        </div>
    )
}

export default Footer
