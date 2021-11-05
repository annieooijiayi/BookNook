import React, { useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router';
import Avatar from 'react-avatar';
import Axios from 'axios';



function Profile(){

    let history = useHistory();

    const [username, setUserName] = useState('');
    const [userID, setUserID] = useState();
    const [readingHistory, setReadingHistory] = useState([]);
    const [readingList, setReadingList] = useState([]);
    const [totalBookRead, setTotalBookRead] = useState('');
    const [totalWishListBook, setTotalWishListBook] = useState('');
    const [ID, setID] = useState('');


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

    const readButton = (book) =>{
        history.push(`/book/${book}`);   
    }

    const userReadingHistory =(ID) => {
        Axios.post('http://localhost:3001/reading_history', {
            user_id: userID,
            book_id: ID,
        }).then((response) => {
            console.log(response);
            
        });
    };
    

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
                                            <td><button type="button" className="btn btn-success" onClick={() => {setID(val.book_id); readButton(val.book_file); userReadingHistory(val.book_id)}}  ><i className="fab fa-readme"></i></button><button type="button" className="btn btn-danger" onClick={() => {deleteWishListBook(val.id)}}  ><i class="fas fa-minus-circle"></i></button></td>
                                            
                                            {/*<td>{val.user_id}</td>
                                            <td>{val.read_date}</td>*/}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                                </table>
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