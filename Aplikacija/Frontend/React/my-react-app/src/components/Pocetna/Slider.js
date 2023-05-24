import React, { useState, useEffect } from "react";
import slider1 from '../../images/slider/slider1.jpeg';
import slider2 from '../../images/slider/slider2.jpg';
import slider3 from '../../images/slider/slider3.jpg';
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

    const fontSize = windowWidth < 768 ? "17px" : "26px";
    return (
        <div className="carousel">
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        style={{ maxWidth: "100%", height: "auto" }}
                        src={slider1}
                        alt="First slide"
                    />
                    <Carousel.Caption className="carousel-caption">
                        <div style={{ color: "#ff1a1a" }}>
                            <h3 style={{ fontSize }}>Vaši ljubimci zaslužuju najbolje, a mi im to pružamo!</h3>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        style={{ maxWidth: "100%", height: "auto" }}
                        src={slider2}
                        alt="Second slide"
                    />

                    <Carousel.Caption className="carousel-caption">
                        <div style={{ color: "#ff1a1a" }}>
                            <h3 style={{ fontSize }}>Obezbedite svojim ljubimcima pažnju i negu koju zaslužuju u našim salonima za kućne ljubimce.</h3>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        style={{ maxWidth: "100%", height: "auto" }}
                        src={slider3}
                        alt="Third slide"
                    />

                    <Carousel.Caption className="carousel-caption">
                        <div style={{ color: "#ff1a1a" }}>
                            <h3 style={{ fontSize }}>U našim salonima za kućne ljubimce možete pronaći širok izbor usluga i proizvoda za negu vaših ljubimaca.</h3>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default Slider;
