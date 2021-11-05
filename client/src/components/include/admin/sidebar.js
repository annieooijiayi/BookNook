import React, {Component} from 'react';
import { Link } from 'react-router-dom';


function Sidebar(){

        return(
          
            <div>
                {/* Main Sidebar Container */}

                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* Brand Logo */}
                <Link to="/admin" className="navbar-brand text-light" style={{paddingLeft: '40px'}} >Admin Book Nook</Link>
                {/* Sidebar */}
                <div className="sidebar">
                    {/* SidebarSearch Form */}
                    <div className="form-inline">
                    <div className="input-group" data-widget="sidebar-search">
                        <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                        <div className="input-group-append">
                        <button className="btn btn-sidebar">
                            <i className="fas fa-search fa-fw" />
                        </button>
                        </div>
                    </div>
                    </div>
                    {/* Sidebar Menu */}
                    <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        {/* Add icons to the links using the .nav-icon class
                                    with font-awesome or any other icon font library */}
                        <li className="nav-item">
                        <a href="/admin" className="nav-link ">
                            <i className="nav-icon fas fa-tachometer-alt" />
                            <p style={{color:'white'}}>
                            Dashboard
                            </p>
                        </a>
                        </li>
                        <li className="nav-item">
                        <a href="/admin_books" className="nav-link ">
                            <i className="nav-icon fas fa-book" />
                            <p style={{color:'white'}}>
                            e-Books
                            </p>
                        </a>
                        </li>
                        
                    </ul>
                    </nav>
                    {/* /.sidebar-menu */}
                </div>
                {/* /.sidebar */}
                </aside>
            </div>
        );
}
export default Sidebar;