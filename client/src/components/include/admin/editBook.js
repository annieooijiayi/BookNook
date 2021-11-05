import React, { useEffect, useState } from "react";
import Axios from 'axios';
import {useParams, useHistory} from 'react-router-dom';

function UpdateBook(){

    const [newTitle, setNewTitle] = useState('');
    const [newAuthor, setNewAuthor] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newType, setNewType] = useState('');
    const [newAge, setNewAge] = useState('');
    const { book_id } = useParams();
    let history = useHistory();


    const updateBook = () => {
        Axios.put(`http://localhost:3001/admin_update/${book_id}`, {
            book_id: book_id,
            book_title: newTitle,
            book_author: newAuthor,
            book_desc: newDescription,
            book_type: newType,
            book_age: newAge
        });
        setNewTitle('');
        setNewAuthor('');
        setNewDescription('');
        setNewType('');
        setNewAge('');
        alert('Book updated successfully');
        history.push('/admin_books');

    }


    return(
        <div>
            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                        <h1 className="m-0">Update Book Details</h1>
                        </div>
                    </div>{/* /.row */}
                    </div>{/* /.container-fluid */}
                </div>
                {/* /.content-header */}
                {/* Main content */}
                <div className="content">
                    <div className="container-fluid">
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
                                <textarea className="form-control" id="book_desc" placeholder="Description" name="description" onChange ={(e) => {setNewDescription(e.target.value);}} rows={3} defaultValue={""} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="book_type">Type of Book</label>
                                <select className="custom-select" id="book_type" name="type" onChange ={(e) => {setNewType(e.target.value);}}>
                                <option value="DEFAULT">Select the type of book</option>
                                <option value='Audio Book'>Audio Book</option>
                                <option value='e-Book'>e-Book</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="book_genre">Age Group</label>
                                <select className="custom-select" id="book_age" name="age" onChange ={(e) => {setNewAge(e.target.value);}}>
                                <option value="DEFAULT">Select the age group of book</option>
                                <option value='3-6 years old'>3-6 years old</option>
                                <option value='7-9 years old'>7-9 years old</option>
                                <option value='10-12 years old'>10-12 years old</option>
                                </select>
                            </div>
                            
                            <button type="submit" className="btn btn-primary" onClick={updateBook}>Update</button>
                        </form>
                        <br/>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UpdateBook;