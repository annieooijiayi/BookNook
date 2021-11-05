import React from 'react';
import { withRouter } from 'react-router';

function About(){
    return(
        <div>
            <section className="section border-bottom">
                <div className="container">
                    <h5 className="main-heading">About Us</h5>
                    <div className="underline"></div>
                    <p style={{textAlign:"justify", borderWidth:'1px', borderStyle:"ridge", padding:"15px", borderRadius:"25px"}}>
                    “When I look back, I am so impressed again with the life-giving power of literature. If I were a young person today, trying to gain a sense of myself in the world, I would do that again by reading, just as I did when I was young.” – Maya Angelou
                    </p>
                    <p style={{textAlign:"justify", borderWidth:'1px', borderStyle:"ridge", padding:"15px", borderRadius:"25px"}}>
                    “It wasn’t until I started reading and found books they wouldn’t let us read in school that I discovered you could be insane and happy and have a good life without being like everybody else.” – John Waters
                    </p>

                    <p style={{textAlign:"justify", borderWidth:'1px', borderStyle:"ridge", padding:"15px", borderRadius:"25px"}}>
                        Use our online kid's book library as a resource to discover new books you've never seen, bring books with you on the road, or just find something fun to read without having to buy a book or leave the house.
                    </p>

                </div>
            </section>

            

        </div>
    );
}
export default withRouter(About);