import React from 'react';
import Slider1 from '../images/1.jpg';
import Slider2 from '../images/2.jpg';
import Slider3 from '../images/3.jpg';

function Slider(){
    return(
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>

            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                <img src={Slider1} className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                    <h1>Book Nook</h1>
                    <h6>Get any kid excited to read and learn with e-books.</h6>
                </div>
                </div>
                <div className="carousel-item">
                <img src={Slider2} className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                    <h1>Book Nook</h1>
                    <h6>Reading is dreaming with open eyes.</h6>
                </div>
                </div>
                <div className="carousel-item">
                <img src={Slider3} className="d-block w-100 h-75" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                    <h1>Book Nook</h1>
                    <h6>Ebooks are fun to read anywhere.</h6>
                </div>
                </div>
                
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}
export default Slider;