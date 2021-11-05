import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Slider from '../include/slider';
import About1 from '../images/about1.jpg'
import About2 from '../images/about2.jpg'
import About3 from '../images/about3.jpg'
import About4 from '../images/about4.jpg'
import About5 from '../images/about5.jpg'


function Home(){
    return(
        <div>
            <Slider />
            
            <section className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 text-center">
                            <h2 className="main-heading">About Us</h2>
                            <div className="underline mx-auto"></div>
                            <p style={{textAlign:"left"}}>
                                "Literacy is a bridge from misery to hope."
                            </p>
                            <p style={{textAlign:"right"}}> 
                                - Kofi Annan
                            </p>
                            <br />
                            <p style={{textAlign:"justify"}}>
                            Use our online kid's book library as a resource to discover new books you've never seen, bring books with you on the road, or just find something fun to read without having to buy a book or leave the house.
                            </p>

                            <Link to="/about" className="btn btn-warning shadow">Read More</Link>
                        </div>
                        <div className="col-md-6 about-images my-4 d-none d-lg-block">
                            <img src={About1} alt="..." className="img-1 img-thumbnail about-img" />
                            <img src={About2} alt="..." className="img-2 img-thumbnail about-img" />
                            <img src={About3} alt="..." className="img-3 img-thumbnail about-img" />
                            <img src={About4} alt="..." className="img-4 img-thumbnail about-img" />
                            <img src={About5} alt="..." className="img-5 img-thumbnail about-img" />
                        </div>
                    </div>
                </div>
            </section>  
        </div>
        
    );
}
export default withRouter(Home);
