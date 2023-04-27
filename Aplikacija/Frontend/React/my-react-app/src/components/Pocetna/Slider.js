import React, { useState } from "react";
import slider1 from '../../images/slider/slider1.jpeg';
import slider2 from '../../images/slider/slider2.jpg';
import slider3 from '../../images/slider/slider3.jpg';
import Carousel from 'react-bootstrap/Carousel';

const Slider = ({ slides }) => {
    return (
        <div className="carousel">
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        style={{maxWidth: "100%", height: "auto"}}
                        src={slider1}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <div style={{ color: "#ff1a1a" }}>
                            <h3>Vaši ljubimci zaslužuju najbolje, a mi im to pružamo!</h3>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        style={{maxWidth: "100%", height: "auto"}}
                        src={slider2}
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <div style={{ color: "#ff1a1a" }}>
                            <h3>Obezbedite svojim ljubimcima pažnju i negu koju zaslužuju u našim salonima za kućne ljubimce.</h3>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        style={{maxWidth: "100%", height: "auto"}}
                        src={slider3}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <div style={{ color: "#ff1a1a" }}>
                            <h3>U našim salonima za kućne ljubimce možete pronaći širok izbor usluga i proizvoda za negu vaših ljubimaca.</h3>
                        </div>

                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default Slider;