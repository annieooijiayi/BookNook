import React, {useCallback, useRef} from "react";
import HTMLFlipBook from 'react-pageflip';
import { SpriteAnimator } from 'react-sprite-animator';
import cat from '../images/cat.png';
import horse from '../images/horse.png';
import pig from '../images/pig1.png';
import sheep from '../images/sheep1.png';
import cow from '../images/cow1.png';

const PageCover = React.forwardRef((props, ref) => {
    return(
        <div className="page page-cover" ref={ref} data-density="hard">
            <div className="page-title">
              <h1>{props.children}</h1>
            </div>
            <div className="page-author">
              <h2>{props.author}</h2>
            </div>
        </div>
    );
});
const Page = React.forwardRef((props, ref) => {
    return (
        <div className="demoPage" ref={ref}>
            <div className="page-content">{props.children}</div>
            <p className="page-number">{props.number}</p>
        </div>
    );
});

function DemoBook(){
    
    const book = useRef();
    const onFlip = useCallback((e) => {
        console.log('Current page: ' + e.data);
    },[]);

    return (  
        <div>
        

            <div className="book-container">
              <div className="book" id="book">
                <HTMLFlipBook 
                  width={550} 
                  height={733} 
                  size="fixed"
                  showCover={true}
                  onFlip={onFlip} 
                  ref={book}
                >
                    <div className="page">
                      <PageCover author="Rolando Merino">The Farm Animals</PageCover>
                    </div>
                    <div className="page1">
                        <Page number="1">
                          <div className="rectangle">
                            The animals that live together all make special sounds....
                          </div>
                        </Page>
                    </div>
                    <div className="page2">
                        <Page number="2">
                          <div className="rectangle">
                            There is the cat and it goes MEOW, MEOW, MEOW.
                          </div>
                          <div className="sprite">
                            <SpriteAnimator
                                sprite={cat}
                                width={398}
                                height={300}
                                startFrame={0}
                                fps={5}
                                shouldAnimate={true}
                                scale={1.5}
                            />
                          </div>
                        </Page>
                    </div>
                    <div className="page3">
                        <Page number="3" >
                          <div className="rectangle">
                            There is a cow that goes MOO.....and makes the milk for children to drink.
                          </div>
                          <div className="sprite">
                            <SpriteAnimator
                              sprite={cow}
                              width={165}
                              height={148}
                              startFrame={0}
                              fps={5}
                              shouldAnimate={true}
                              frameCount={2}
                              scale={0.8}
                            />
                          </div>
                        </Page>
                    </div>
                    <div className="page4">
                        <Page number="4">
                          <div className="rectangle">
                            There is the pig and it goes OINK, OINK, OINK.
                          </div>
                          <div className="sprite">
                            <SpriteAnimator
                              sprite={pig}
                              width={150}
                              height={110}
                              startFrame={0}
                              fps={3}
                              shouldAnimate={true}
                              frameCount={2}
                              scale={0.8}
                            />
                          </div>
                        </Page>
                    </div>
                    <div className="page5">
                        <Page number="5">
                          <div className="rectangle">
                            There is the sheep, it has a wooly coat and goes BAA, BAA, BAA...
                          </div>
                          <div className="sprite">
                            <SpriteAnimator
                              sprite={sheep}
                              width={168}
                              height={155}
                              startFrame={0}
                              fps={5}
                              shouldAnimate={true}
                              frameCount={2}
                              scale={0.8}
                            />
                          </div>
                        </Page>
                    </div>
                    <div className="page6">
                        <Page number="6">
                          <div className="rectangle">
                            There is a horse that goes NEIGH...NEIGH...and gallops around.
                          </div>
                          <div className="sprite">
                            <SpriteAnimator
                              sprite={horse}
                              width={166}
                              height={155}
                              startFrame={0}
                              fps={3}
                              shouldAnimate={true}
                              frameCount={2}
                              scale={0.8}
                            />
                          </div>
                        </Page>
                    </div>
                    <div className="page">
                      <PageCover>The End</PageCover>
                    </div>    
                </HTMLFlipBook>
              </div>
              
              
            </div>
            <div className="buttons" style={{textAlign:'center'}}>
              <button type="button" className="btn btn-outline-primary" onClick={() => book.current.pageFlip().flipPrev()}>Previous</button>
              <button type="button" className="btn btn-outline-primary" onClick={() => book.current.pageFlip().flipNext()}>Next</button>
            </div>
        </div>
        
    );
}

export default DemoBook;