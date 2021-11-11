import React, { useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router';
import Avatar from 'react-avatar';
import Axios from 'axios';
import Modal from 'react-modal';
import {Document, Page} from 'react-pdf/dist/esm/entry.webpack';



function Profile(){

    let history = useHistory();

    const [username, setUserName] = useState('');
    const [userID, setUserID] = useState();
    const [readingHistory, setReadingHistory] = useState([]);
    const [readingList, setReadingList] = useState([]);
    const [totalBookRead, setTotalBookRead] = useState('');
    const [totalWishListBook, setTotalWishListBook] = useState('');
    const [ID, setID] = useState('');
    const [file, setFile] = useState('');
    const [bookName, setbookName] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false);
    const [DictionaryModalIsOpen, setDictionaryIsOpen] = useState(false);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [meaning, setMeaning] = useState([]);
    const [word, setWord] = useState('');

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

    Axios.defaults.withCredentials = true;

    useEffect(() => {
        Axios.get('http://localhost:3001/profile').then((response) =>{
            setUserName(response.data.user[0].user_name);
            setUserID(response.data.user[0].user_id);
        });
    });

    const getReadingHistory = (user) => {
        Axios.get(`http://localhost:3001/reading_history/${user}`).then((response) =>{
            console.log(response.data);
            setReadingHistory(response.data);
        });
    }

    const getReadingList = (user) => {
        Axios.get(`http://localhost:3001/reading_list/${user}`).then((response) =>{
            console.log(response.data);
            setReadingList(response.data);
        });
    }

    const deleteWishListBook = (id) =>{
        Axios.delete(`http://localhost:3001/delete_wishlist_book/${id}`);
            
            alert('Book removed from wishlist successfully');
            window.location.reload();
    }

    useEffect(() => {
        Axios.get(`http://localhost:3001/reading_history/${userID}`).then((response) =>{
            console.log(response.data);
            setTotalBookRead(response.data.length);
        });
        
    });

    useEffect(() => {
        Axios.get(`http://localhost:3001/reading_list/${userID}`).then((response) =>{
            console.log(response.data);
            setTotalWishListBook(response.data.length);
        });
        
    });


    const userReadingHistory =(ID) => {
        Axios.post('http://localhost:3001/reading_history', {
            user_id: userID,
            book_id: ID,
        }).then((response) => {
            console.log(response);
            
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
    
      
    
      const closeModal = () =>{
          setIsOpen(false);
      }
    
      const closeDictionaryModal = () =>{
        setDictionaryIsOpen(false);
      }
    
      

    return(
        <div>
            <section className="section">
                <div className="info-container">
                    <div className="profile-card shadow">
                        <div className="profile-card-header">
                            <div className="row">
                                <div className="avatar">
                                    <Avatar size = "150" color="#E0BBE4" round={true} />
                                </div>
                                <div className="user-info">
                                    <h1>{username}</h1>
                                    <br />
                                    <br/>
                                    <div className="row">
                                        <div className="col-2">
                                            <h5 style={{textAlign:"center"}}>{totalBookRead}</h5>
                                            <h5 style={{textAlign:"center"}}>Books Read</h5>
                                        </div>
                                        <div className="col-2">
                                            <h5 style={{textAlign:"center"}}>{totalWishListBook}</h5>
                                            <h5 style={{textAlign:"center"}}>Books To Read</h5>
                                        </div>
                                    </div>                                
                                </div>
                            </div>
                            <br />
                            <br />
                        </div> 
                        <div className="profile-card-body">
                            <nav>
                                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                    <a class="nav-item nav-link " id="nav-activity-tab" data-toggle="tab" href="#nav-activity" role="tab" aria-controls="nav-activity" aria-selected="true" onClick={()=>{getReadingHistory(userID)}}>Reading History</a>
                                    <a class="nav-item nav-link" id="nav-list-tab" data-toggle="tab" href="#nav-list" role="tab" aria-controls="nav-list" aria-selected="false" onClick={()=>{getReadingList(userID)}}>Wish List</a>
                                </div>
                            </nav>
                            <div class="tab-content" id="nav-tabContent">
                                <div class="tab-pane fade show " id="nav-activity" role="tabpanel" aria-labelledby="nav-activity-tab">
                                <table className="table table-hover" >
                                <thead>
                                    <tr>
                                        {/*<th>ID</th>
                                        <th>Book ID</th>*/}
                                        <th>Book Cover</th>
                                        <th>Book Title</th>
                                        {/*<th>User ID</th>*/}
                                        <th>Read Date</th>
                                        <th>Reading Progress</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {readingHistory.map((val) =>{
                                        return(
                                            <tr key={val.reading_id}>
                                            {/*<td>{val.book_id}</td>
                                            <td>{val.book_id}</td>*/}
                                            <td><img src={`http://localhost:3001/images/${val.book_cover}`} style={{borderRadius:"8px", width:"50%", height:"100px", display:"float"}}/></td>
                                            <td>{val.book_title}</td>
                                            {/*<td>{val.user_id}</td>*/}
                                            <td>{val.read_date}</td>
                                            <td>{val.current_page} out of {val.total_pages} pages</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                                </table>
                                </div>
                                <div class="tab-pane fade" id="nav-list" role="tabpanel" aria-labelledby="nav-list-tab">
                                <table className="table table-hover" >
                                <thead>
                                    <tr>
                                        {/*<th>ID</th>
                                        <th>Book ID</th>*/}
                                        <th>Book Cover</th>
                                        <th>Book Title</th>
                                        <th>Action</th>
                                        {/*<th>Read Date</th>*/}
                                    </tr>
                                </thead>
                                <tbody>
                                    {readingList.map((val) =>{
                                        return(
                                            <tr key={val.id}>
                                            {/*<td>{val.book_id}</td>
                                            <td>{val.book_id}</td>*/}
                                            <td><img src={`http://localhost:3001/images/${val.book_cover}`} style={{borderRadius:"8px", width:"40%", height:"100px", display:"float"}}/></td>
                                            <td>{val.book_title}</td>
                                            <td><button type="button" className="btn btn-success" onClick={() => {setID(val.book_id); openModal(); userReadingHistory(val.book_id); setFile(val.book_file); setbookName(val.book_title)}}  ><i className="fab fa-readme"></i></button><button type="button" className="btn btn-danger" onClick={() => {deleteWishListBook(val.id)}}  ><i class="fas fa-minus-circle"></i></button></td>
                                            
                                            {/*<td>{val.user_id}</td>
                                            <td>{val.read_date}</td>*/}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                                </table>
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
                                <Modal
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
                            </div>
                        </div>       
                        <br />
                
                    </div>
                    
                </div>
            </section>
        </div>
    );
}
export default withRouter(Profile);