import React from "react";
import './Button.css';

const Button = ({naziv}) => {
    return (
        <button className="customButton">{naziv}</button>
    );
};


export default Button;