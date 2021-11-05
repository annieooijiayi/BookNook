import React, {Component, useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import Axios from "axios";
import Modal from 'react-modal';

function Header(){

    let history = useHistory();
    const [messageList, setMessageList] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);

    const logout =() => {
        Axios.get('http://localhost:3001/logout');
        history.push('/');
    }

    useEffect(() => {
        Axios.get('http://localhost:3001/contact').then((response)=>{
            console.log(response);
            setMessageList(response.data);
        })
    }, [])

    const customStyles ={ 
        content:{
            top: '55%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            maxHeight: '600px'
        },
    };

    const openModal = () => {
        setIsOpen(true);  
    }

    const closeModal = () =>{
        setIsOpen(false);
    }

        return(

            <div>
            {/* Navbar */}
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* Left navbar links */}
            <ul className="navbar-nav">
                <li className="nav-item">
                <div className="nav-link" data-widget="pushmenu"  role="button"><i className="fas fa-bars" /></div>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                <Link to="/admin" className="nav-link">Home</Link>
                </li>
            </ul>
            {/* Right navbar links */}
            <ul className="navbar-nav ml-auto">
                
                <li className="nav-item ">
                    <button  className="btn btn-link nav-link active" onClick={openModal}>Messages</button>
                </li>
                
                <li className="nav-item">
                    <button onClick={logout} className="btn btn-link nav-link active ">Log Out</button>
                </li>
            </ul>
            </nav>
            {/* /.navbar */}

            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                ariaHideApp={false}
            >
                
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Messages</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                    </div>
                    <div className="modal-body">
                        {messageList.map((val)=>{
                            return(
                                <div className="message" key={val.contact_id}>
                                    <h6>{val.name}</h6>
                                    <h6>{val.email}</h6>
                                    <p>{val.message}</p>
                                    <hr />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </Modal>
            </div>
            
        );
    
}
export default Header;