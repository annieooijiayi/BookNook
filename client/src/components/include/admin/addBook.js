import React, { useState } from "react";
import axios from 'axios';


function AddBook(){


    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    //const [type, setType] = useState('');
    const [age, setAge] = useState('');
    const [image, setImage] = useState();
    const [imageName, setImageName] = useState('');
    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('');

    const saveImage = (e) =>{
        setImage(e.target.files[0]);
        setImageName(e.target.files[0].name);
    };

    const saveFile = (e) =>{
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('description', description);
        //formData.append('type', type);
        formData.append('age', age);
        formData.append('image', image);
        formData.append('imageName', imageName);
        formData.append('file', file);
        formData.append('fileName', fileName);

        try{
            const res = await axios.post(
                'http://localhost:3001/admin_add',
                formData
            );
            console.log(res);
        }catch (ex) {
            console.log(ex);
        } 
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
                        <h1 className="m-0">Add Book</h1>
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
                                <input type="text" className="form-control" id="book_title" placeholder="Title" name="title" onChange ={(e) => {setTitle(e.target.value);}} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="book_author">Author</label>
                                <input type="text" className="form-control" id="book_author" placeholder="Author" name="author" onChange ={(e) => {setAuthor(e.target.value);}} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="book_desc">Description</label>
                                <textarea className="form-control" id="book_desc" placeholder="Description" name="description" rows={3} defaultValue={""} onChange ={(e) => {setDescription(e.target.value);}}/>
                            </div>
                            {/*<div className="form-group">
                                <label htmlFor="book_type">Type of Book</label>
                                <select className="custom-select" id="book_type" name="type" onChange ={(e) => {setType(e.target.value);}}>
                                <option value="DEFAULT">Select the type of book</option>
                                <option value='Audio Book'>Audio Book</option>
                                <option value='e-Book'>e-Book</option>
                                </select>
                            </div>*/}
                            <div className="form-group">
                                <label htmlFor="book_age">Age Group</label>
                                <select className="custom-select" id="book_age" name="age" onChange ={(e) => {setAge(e.target.value);}}>
                                <option value="DEFAULT">Select the age group of book</option>
                                <option value='3-6 years old'>3-6 years old</option>
                                <option value='7-9 years old'>7-9 years old</option>
                                <option value='10-12 years old'>10-12 years old</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="book_cover">Book Cover</label>
                                <input type="file" className="form-control-file" id="book_cover" name="image" accept="image/*" onChange={saveImage} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="book_file">Book File</label>
                                <input type="file" className="form-control-file" id="book_file" name="file" accept="application/pdf" onChange={saveFile} />
                            </div>
                            <button type="submit" class="btn btn-primary" onClick={uploadFile}>Submit</button>
                        </form>
                        <br/>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AddBook;