import React, { useEffect, useState } from 'react';
import {  withRouter } from 'react-router';
import LeftArrow from '../images/left-arrow.svg';
import RightArrow from '../images/right-arrow.svg';
import Axios from 'axios';

import Modal from 'react-modal';
import {Document, Page} from 'react-pdf/dist/esm/entry.webpack';
import cover from '../images/cover.PNG';
import DemoBook from '../books/flipbook';
import Slider from 'react-slick';

function BookLibrary(){


  const [bookList, setBookList] = useState([]);
  const [ID, setID] = useState('');
  const [userID, setUserID] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState('');
  const [bookName, setbookName] = useState('');

  const [modalIsOpen, setIsOpen] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [file, setFile] = useState('');
  const [meaning, setMeaning] = useState([]);
  const [word, setWord] = useState('');
  const [DictionaryModalIsOpen, setDictionaryIsOpen] = useState(false);
  const [bookModalOpen, setBookModalOpen] = useState(false);
  
  useEffect(() => {
    Axios.get(`http://localhost:3001/dictionary/${word}`).then((response)=>{
        console.log(response.data);
        setMeaning(response.data);
    })
  },[word]);
  
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
      changePage(-1);
      
  }

  function nextPage() {
      changePage(1);
  }

  const updateProgress = (ID, userID) =>{
    Axios.post(`http://localhost:3001/update_progress/${ID}/${userID}`,{
            total_pages: numPages,
            current_page: pageNumber,
        }).then((response)=>{
            console.log(response);
    })
  }

  useEffect(() => {
    Axios.get('http://localhost:3001/admin_books').then((response) =>{
        console.log(response.data);
        setBookList(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get('http://localhost:3001/profile').then((response) =>{
        setUserID(response.data.user[0].user_id);
    });
  });

  Axios.defaults.withCredentials = true;

    const userReadingHistory =(ID) => {
        Axios.post('http://localhost:3001/reading_history', {
            user_id: userID,
            book_id: ID,
        }).then((response) => {
            console.log(response);
            
        });
    };

    const addReadingList =(ID) => {
      Axios.post('http://localhost:3001/reading_list', {
          user_id: userID,
          book_id: ID,
      }).then((response) => {
          console.log(response);
          if(response.data.message){
            alert(response.data.message);
          }
          
      });
  };

  const customStyles ={ 
    content:{
        top: '55%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: 'auto',
        maxHeight: '100vh'
    },
  };

  const Style ={ 
    content:{
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '700px',
        maxHeight: '100vh'
    },
  };

  const openModal = () => {
      setIsOpen(true);  
  }

  const openDictionaryModal = () => {
    setDictionaryIsOpen(true);  
  }

  const openBookModal = () => {
    setBookModalOpen(true);  
  }

  const closeModal = () =>{
      setIsOpen(false);
  }

  const closeDictionaryModal = () =>{
    setDictionaryIsOpen(false);
  }

  const closeBookModal = () =>{
    setBookModalOpen(false);
  }

  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <img src={LeftArrow} alt="prevArrow" {...props} />
  );

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <img src={RightArrow} alt="nextArrow" {...props} />
  );

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: <SlickArrowLeft />,
        nextArrow: <SlickArrowRight />,
        className: "slides"

    };

    return(
      <div className="search-nav">
        <nav className="navbar navbar-light bg-light">
          <form className="form-inline center">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>{setSearchTerm(e.target.value)}} />
            <select id="inputState" className="form-control mr-sm-2 custom-select" onChange={(e)=>{setFilterTerm(e.target.value)}}>
              <option selected value="DEFAULT">Select Age Group</option>
              <option value="3-6 years old">3-6 years old</option>
              <option value="7-9 years old">7-9 years old</option>
              <option value="10-12 years old">10-12 years old</option>
            </select>
            
          </form>
        </nav>

      <div className="slide" style={{padding:24}}>
      <h5 className="main-heading"> Library</h5>
      <div className="underline"></div>
      <hr />
      <h4 className="title" style={{fontFamily:'Berkshire Swash'}}>e-Book</h4>
      <Slider {...settings} className="card-container" >
        {bookList.filter((item)=>{
          if (searchTerm == "" && filterTerm =="DEFAULT"){
            return item
          }else if(item.book_title.toLowerCase().includes(searchTerm.toLowerCase()) && filterTerm ==="DEFAULT"){
            return item
          }else if(item.book_age.includes(filterTerm) && item.book_title.toLowerCase().includes(searchTerm.toLowerCase())){
          return item
            
          }
        }).map((item) => {
          return (
            <div key={item.book_id}>
            <div className="row">
            <div className="card" key={item.book_id} style={{paddingTop:"10px" }}>
              
              <img src={`http://localhost:3001/images/${item.book_cover}`} style={{borderRadius:"8px", width:"100%", height:"330px", display:"float"}}/>
              <h5>{item.book_title}</h5>
              <h6>{item.book_author}</h6>
              <h6>{item.book_age}</h6>

              <br />
              <button type="button" className="btn btn-success" onClick={() => {setID(item.book_id); openModal(); userReadingHistory(item.book_id); setFile(item.book_file); setbookName(item.book_title)}}  ><i className="fab fa-readme"></i></button>
              <button type="button" className="btn btn-warning" onClick={() => {setID(item.book_id); addReadingList(item.book_id)}}><i className="fas fa-plus"></i></button>
            
            </div>
            
            </div>
            </div>
            )
        })}
      </Slider>
      <hr />
      <h4 className="title" style={{fontFamily:'Berkshire Swash'}}>Animated e-Book</h4>
      <hr />
            <Modal
              isOpen={modalIsOpen}
              style={customStyles}
              ariaHideApp={false}
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">{bookName}</h5>
                    <button type="button" className="btn-close" aria-label="Close" onClick={()=>{updateProgress(ID, userID);closeModal(); setPageNumber(1)}}></button>
                  </div>
                  <div className="modal-body">
                  <nav className="navbar navbar-expand-md rounded pt-4">
                    <button className="navbar-toggler toggler-mobile-position ml-auto" type="button" data-toggle="collapse" data-target="#collapsingNavbar3">
                        <span className=""><i className="fa fa-bars" aria-hidden="true" style={{color:"#000000"}}></i></span>
                    </button>
                    <div className="navbar-collapse collapse" id="collapsingNavbar3">
                        <ul className="navbar-nav text-center nav-fill mx-auto">
                            <li className="mx-auto">
                                <button type="button" className="btn btn-light nr-custom-trigger" title="Text-to-speech"><i className="fas fa-headphones"></i></button>
                            </li>
                            <li className="mx-auto">
                                <button type="button" className="btn btn-light" title="Dictionary" onClick={openDictionaryModal}><i className="fas fa-spell-check"></i></button>
                            </li>
                        </ul>
                    </div>
                  </nav>
                    <div className="book" id="book">
                      <Document
                        file={`http://localhost:3001/e-book/${file}`} 
                        onLoadSuccess={onDocumentLoadSuccess}
                      >
                          <Page pageNumber={pageNumber}></Page>
                            
                      </Document>
                    </div>
                  <div className="buttons" style={{textAlign:'center'}}>
                    <button type="button" className="btn btn-outline-primary" disabled={pageNumber <= 1} onClick={()=>{previousPage()}} style={{alignItems:'center'}}>Previous</button>
                    <button type="button" className="btn btn-outline-primary" disabled={pageNumber >= numPages} onClick={()=>{nextPage()}}>Next</button>
                  </div>
                  </div>
                </div>
            </Modal>
    </div>
            
            <div className="animated-books">
              <div className="card" style={{paddingTop:"10px", width:'450px', marginLeft:'23px'}}>
              
              <img src={cover} style={{borderRadius:"8px", width:"100%", height:"330px", display:"float", padding:'0px 15px'}}/>
              <h5 style={{padding:'0px 15px'}}>The Farm Animals</h5>
              <h6 style={{padding:'0px 15px'}}>Rolando Merino</h6>
              <h6 style={{padding:'0px 15px'}}>3-6 years old</h6>

              <br />
              <button type="button" className="btn btn-success" onClick={openBookModal}><i className="fab fa-readme"></i></button>
            </div>
            <Modal
              isOpen={bookModalOpen}
              style={customStyles}
              ariaHideApp={false}
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">The Farm Animals</h5>
                    <button type="button" className="btn-close" aria-label="Close" onClick={()=>{closeBookModal()}}></button>
                  </div>
                  <div className="modal-body">
                  <nav className="navbar navbar-expand-md rounded pt-4">
                    <button className="navbar-toggler toggler-mobile-position ml-auto" type="button" data-toggle="collapse" data-target="#collapsingNavbar3">
                        <span className=""><i className="fa fa-bars" aria-hidden="true" style={{color:"#000000"}}></i></span>
                    </button>
                    <div className="navbar-collapse collapse" id="collapsingNavbar3">
                        <ul className="navbar-nav text-center nav-fill mx-auto">
                            <li className="mx-auto">
                                <button type="button" className="btn btn-light nr-custom-trigger" title="Text-to-speech"><i className="fas fa-headphones"></i></button>
                            </li>
                            <li className="mx-auto">
                                <button type="button" className="btn btn-light" title="Dictionary" onClick={openDictionaryModal}><i className="fas fa-spell-check"></i></button>
                            </li>
                        </ul>
                    </div>
                  </nav>
                    <div className="book" id="book">
                      <DemoBook />
                    </div>
                  
                  </div>
                </div>
            </Modal>
            </div><Modal
                isOpen={DictionaryModalIsOpen}
                style={Style}
                ariaHideApp={false}
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Dictionary</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={closeDictionaryModal}></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" value={word} onChange={(e)=> setWord(e.target.value)} />
                            <label htmlFor="floatingInput">Search a word</label>
                        </div>
                        <div className="definition-container" >
                            
                            {word === "" ?(
                                <span className="subtitle">Start by typing a word </span>
                            ):(
                            meaning.map((mean) => 
                            mean.meanings.map((item) => 
                            item.definitions.map((def)=>(
                                <div className="single-meaning" key={def.definition} >
                                    <b>Definition: </b>
                                    <p>{def.definition}</p>
                                    <hr />
                                    {def.example && (
                                        <span>
                                            <b>Example: </b>
                                            <p>{def.example}</p>
                                        </span>
                                    )}
                                </div>
                            ))
                            )
                            )
                            )}
                        </div>
                    </div>
                </div>
            </Modal>
    </div>
    );
}
export default withRouter(BookLibrary);