import React, {Component, useEffect, useState} from "react";
import Axios from "axios";


function Content(){
    const [userList, setUserList] = useState([]);

    useEffect(()=>{
        Axios.get('http://localhost:3001/user_list').then((response) =>{
            console.log(response.data);
            setUserList(response.data);
        })
    }, [])

    const deleteUser = (user) => {
        Axios.delete(`http://localhost:3001/delete_user/${user}`);
        alert('User deleted successfully');
        window.location.reload();

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
                        <h1 className="m-0">Dashboard</h1>
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
                                    <th>User ID</th>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    {/*<th>Total Book Read</th>*/}
                                    <th>Remove User</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userList.map((val)=>{
                                    return(
                                        <tr key={val.user_id}>
                                            <td>{val.user_id}</td>
                                            <td>{val.user_name}</td>
                                            <td>{val.user_email}</td>
                                            {/*<td>{val.total}</td>*/}
                                            <td><button type="button" className="btn btn-danger" onClick={() => {deleteUser(val.user_id)}}><i className="far fa-trash-alt"></i></button></td>
                                        </tr>
                                        

                                    )
                                })}
                            </tbody> 
                        </table>
                    </div>
                    {/* /.container-fluid */}
                </div>
                {/* /.content */}
                </div>
                {/* /.content-wrapper */}

            </div>
        )
}
export default Content;