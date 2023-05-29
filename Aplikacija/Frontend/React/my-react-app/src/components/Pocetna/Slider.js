import React, { useState, useEffect } from "react";
import slider1 from '../../images/slider/slider1.jpeg';
import slider2 from '../../images/slider/slider2.jpg';
import slider3 from '../../images/slider/slider3.jpg';
import slider1Phone from '../../images/slider/slider1-phone.jpg';
import slider2Phone from '../../images/slider/slider2-phone.jpg';
import slider3Phone from '../../images/slider/slider3-phone.jpg';
import Carousel from 'react-bootstrap/Carousel';
import './Slider.css'

const Slider = ({ slides }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const isPhoneScreen = windowWidth < 1513;
    const images = isPhoneScreen
        ? [slider1Phone, slider2Phone, slider3Phone]
        : [slider1, slider2, slider3];
    const fontSize = isPhoneScreen ? "17px" : "26px";

    const slideTexts = [
        "Vaši ljubimci zaslužuju najbolje, a mi im to pružamo!",
        "Obezbedite svojim ljubimcima pažnju i negu koju zaslužuju u našim salonima za kućne ljubimce.",
        "U našim salonima za kućne ljubimce možete pronaći širok izbor usluga i proizvoda za negu vaših ljubimaca.",
        // Add text for the remaining slides
    ];

    return (
        <div className="carousel">
            <Carousel>
                {images.map((image, index) => (
                    <Carousel.Item key={index}>
                        <img
                            className="d-block w-100"
                            style={{ maxWidth: "100%", height: "auto" }}
                            src={image}
                            alt={`Slide ${index + 1}`}
                        />
                        <Carousel.Caption className="carousel-caption">
                            <div style={{ color: "#ff1a1a" }}>
                                <h3 style={{ fontSize }}>{slideTexts[index]}</h3>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

export default Slider;
