import React, { useEffect, useState } from 'react';
import {withRouter} from 'react-router';
import {Document, Page} from 'react-pdf/dist/esm/entry.webpack';
import Modal from 'react-modal';
import Axios from 'axios';
import { useBeforeunload } from 'react-beforeunload';

function DisplayBook(){

    const [fileName, setFileName] = useState('');
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [meaning, setMeaning] = useState([]);
    const [word, setWord] = useState("");
    const [userID, setUserID] = useState('');
    const [bookID, setBookID] = useState('');
    const [current_page, setCurrentPage] = useState('');
    const [uID, setUID] = useState('');
    const [bID, setBID] = useState('');

    Axios.defaults.withCredentials = true;

    sessionStorage.setItem("current", JSON.stringify([1, bookID, userID]));

    var currentPageNum = JSON.parse(sessionStorage.getItem('current'));
    currentPageNum[0]=pageNumber;
    sessionStorage.setItem('current', JSON.stringify(currentPageNum));

    {/*useBeforeunload(() => 
        'You’ll lose your data!'
    );*/}

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    useEffect(() => {
        Axios.get('http://localhost:3001/profile').then((response) =>{
            setUserID(response.data.user[0].user_id);
        });
      });

    useEffect(() =>{
        const page = JSON.parse(sessionStorage.getItem('current'));
        //const book_id = JSON.parse(sessionStorage.getItem('book_id'));
        
        setCurrentPage(page[0]);
        //setBID(page[1]);
        setUID(page[2]);
        
        Axios.post(`http://localhost:3001/update_progress/${bookID}/${userID}`,{
            //bookID: book_id,
            //user_id: uID,
            total_pages: numPages,
            current_page: pageNumber,
        }).then((response)=>{
            console.log(response);
        })
    });

    {/*useEffect(() =>{
        Axios.post(`http://localhost:3001/update_current/${bookID}/${userID}`,{
            current_page: current,
        }).then((response)=>{
            console.log(response.data);
        })
    });*/}

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }
    
    function previousPage() {
        changePage(-1);
        
    }
    
    function nextPage() {
        changePage(1);
    }

    useEffect (() =>{
        var pathArray = window.location.pathname.split('/');
        setFileName(pathArray[2]);
    }, []);

    useEffect(() =>{
        Axios.get(`http://localhost:3001/getBookID/${fileName}`).then((response) =>{
            console.log(response.data[0].book_id);
            setBookID(response.data[0].book_id);
            //sessionStorage.setItem('book_id', JSON.stringify(bookID));
        });
    });
    

    {/*useEffect(() =>{
        const page = JSON.parse(sessionStorage.getItem('current'));
        setCurrentPage(page[0]);

        Axios.put(`http://localhost:3001/update_progress/${bookID}/${userID}`,{
            //current_page: current_page,
            //total_pages: numPages
        }).then((response)=>{
            console.log(response.data);
        });
    });*/}

    const customStyles ={ 
        content:{
            top: '55%',
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

    const closeModal = () =>{
        setIsOpen(false);
    }

    useEffect((word) => {
        Axios.get(`http://localhost:3001/dictionary/${word}`).then((response)=>{
            console.log(response.data);
        })
    });

    {/*const DictionaryAPI = async() =>{
        try{
            const data = await Axios.get(
                `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
            );
            setMeaning(data.data);
        }catch (error){
            console.log(error);
        }
        
    }

    useEffect(() => {
        DictionaryAPI();
    }, [word])*/}

    return(
    <div className="book-container">
        <div className="book" id="book">
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
                            <button type="button" className="btn btn-light" title="Dictionary" onClick={openModal}><i className="fas fa-spell-check"></i></button>
                        </li>
                    </ul>
                </div>
            </nav>
            <Document
                file={`http://localhost:3001/e-book/${fileName}`} 
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber}></Page>
                
            </Document>
            {/*<p>Page {pageNumber} of {numPages}</p>*/}
            <div className="buttons" style={{textAlign:'center'}}>
            <button type="button" className="btn btn-outline-primary" disabled={pageNumber <= 1} onClick={()=>{previousPage()}} style={{alignItems:'center'}}>Previous</button>
            <button type="button" className="btn btn-outline-primary" disabled={pageNumber >= numPages} onClick={()=>{nextPage()}}>Next</button>
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                ariaHideApp={false}
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Dictionary</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" value={word} onChange={(e)=> setWord(e.target.value)} />
                            <label htmlFor="floatingInput">Search a word</label>
                        </div>
                        <div className="definition-container" >
                            {/*<p>/{meaning[0].phonetics[0].text}/</p>
                            {meaning[0] && word && (
                                <audio
                                    src={meaning[0].phonetics[0] && meaning[0].phonetics[0].audio}
                                    style={{backgroundColor:'#fff', borderRadius:'10'}}
                                    controls
                                >
                                    Your browser doesn't support audio element.
                                </audio>
                            )}*/}
                            <br />
                            {word === "" ?(
                                <span className="subtitle">Start by typing a word </span>
                            ):(
                            meaning.map((mean) => 
                            mean.meanings.map((item) => 
                            item.definitions.map((def)=>(
                                <div className="single-meaning" key={def.definition}>
                                    <b>Definition: </b>
                                    <p>{def.definition}</p>
                                    <hr />
                                    {def.example && (
                                        <span>
                                            <b>Example: </b>
                                            <p>{def.example}</p>
                                        </span>
                                    )}
                                  {/*  {def.synonyms && (
                                        <span>
                                            <b>Synonyms: </b>
                                            <p>{def.synonyms.map((synonym)=> `${synonym},`)}</p>
                                        </span>
                                    )}*/}
                                </div>
                            ))
                            ))
                            )}
                        </div>
                    </div>
                </div>
            </Modal>
            </div> 
            
        </div>
    </div>
    );
}
export default withRouter(DisplayBook);