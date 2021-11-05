import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Modal from 'react-modal';
import {useHistory} from 'react-router-dom';


function BookList(){
    let history = useHistory();

    const [bookList, setBookList] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newAuthor, setNewAuthor] = useState('');
    const [newDescription, setNewDescription] = useState('');
    //const [newType, setNewType] = useState('');
    const [newAge, setNewAge] = useState('');
    const [book_id, setID] = useState('');

    useEffect(() => {
        Axios.get('http://localhost:3001/admin_books').then((response) =>{
            console.log(response.data);
            setBookList(response.data);
        })
    }, [])

    const deleteBook = (book) => {
        Axios.delete(`http://localhost:3001/delete_book/${book}`);
        alert('Book deleted successfully');
        window.location.reload();

    }

    const updateBook = () => {
        Axios.put('http://localhost:3001/admin_update', {
            book_title: newTitle,
            book_author: newAuthor,
            book_desc: newDescription, 
            //book_type: newType,
            book_age: newAge,
            book_id: book_id
        }).then((response) =>{
            if (response.data.message === 'Please fill in all the fields!'){
                console.log(response.data.message);
            }else{
                setNewTitle('');
                setNewAuthor('');
                setNewDescription('');
                //setNewType('');
                setNewAge('');
                alert('Book updated successfully');
                closeModal();
                window.location.reload();
            }
        })
        

    }

    const customStyles ={ 
        content:{
            top: '55%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
        },
    };

    const openModal = () => {
        setIsOpen(true);  
    }

    const closeModal = () =>{
        setIsOpen(false);
    }
    

    return (
   
        <div>
            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                        <h1 className="m-0">Books</h1>
                        </div>
                        <div className="col-sm-6">
                        <button type="button" className="btn btn-primary" style={{float:'right'}} onClick={()=>history.push('/admin_add')}>Add Book</button>
                        </div>
                    </div>{/* /.row */}
                    </div>{/* /.container-fluid */}
                </div>
                {/* /.content-header */}
                
                {/* Main content */}
                <div className="content">
                    <div className="container-fluid">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    {/*<th>ID</th>*/}
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Description</th>
                                    {/*<th>Type</th>*/}
                                    <th>Age Group</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookList.map((val) =>{
                                    return(
                                        <tr key={val.book_id}> 
                                        {/*<td>{val.book_id}</td>*/}
                                        <td>{val.book_title}</td>
                                        <td>{val.book_author}</td>
                                        <td>{val.book_desc}</td>
                                        {/*<td>{val.book_type}</td>*/}
                                        <td>{val.book_age}</td>
                                        <td><button type="button" className="btn btn-success" onClick={() => {setID(val.book_id); openModal(val.book_id)}}><i className="fas fa-edit"></i></button>
                                        <button type="button" className="btn btn-danger" onClick={() => {deleteBook(val.book_id)}}><i className="far fa-trash-alt"></i></button>
                                        </td>
                                        </tr>
                                    );
                                })}
                                <Modal
                                isOpen={modalIsOpen}
                                style={customStyles}
                                ariaHideApp={false}
                                >
                                    <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Update Book Details</h5>
                                        <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                                    </div>
                                    <div className="modal-body">
                                        <form>
                                            <div className="form-group">
                                                <label htmlFor="book_title">Title</label>
                                                <input type="text" className="form-control" id="book_title" placeholder="Title" name="title" onChange ={(e) => {setNewTitle(e.target.value);}}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="book_author">Author</label>
                                                <input type="text" className="form-control" id="book_author" placeholder="Author" name="author"  onChange ={(e) => {setNewAuthor(e.target.value);}}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="book_desc">Description</label>
                                                <textarea className="form-control" id="book_desc" placeholder="Description" name="description" onChange ={(e) => {setNewDescription(e.target.value);}} rows={2} defaultValue={""} />
                                            </div>
                                            {/*<div className="form-group">
                                                <label htmlFor="book_type">Type of Book</label>
                                                <select className="custom-select" id="book_type" name="type" onChange ={(e) => {setNewType(e.target.value);}}>
                                                <option value="DEFAULT">Select the type of book</option>
                                                <option value='Audio Book'>Audio Book</option>
                                                <option value='e-Book'>e-Book</option>
                                                </select>
                                            </div>*/}
                                            <div className="form-group">
                                                <label htmlFor="book_genre">Age Group</label>
                                                <select className="custom-select" id="book_age" name="age" onChange ={(e) => {setNewAge(e.target.value);}}>
                                                <option value="DEFAULT">Select the age group of book</option>
                                                <option value='3-6 years old'>3-6 years old</option>
                                                <option value='7-9 years old'>7-9 years old</option>
                                                <option value='10-12 years old'>10-12 years old</option>
                                                </select>
                                            </div>
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal} style={{float:'right'}}>Close</button>
                                                <button type="button" className="btn btn-primary" style={{float:'right'}} onClick={updateBook}>Save changes</button>
                                        </form>
                                    </div>
                                    </div>
                                </Modal>
                            </tbody> 
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default BookList;