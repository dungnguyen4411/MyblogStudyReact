import React, { useRef } from "react"
import Auth from "../User/Auth";
import "../Blog/Blogs.css"
import { ListBlog } from "./ListBlog";
import { CreateNewBlog } from "./CreateNewBlog";
export const Blogs = (props) => {
    const childRef = useRef();
    const childRefCreateBlog = useRef();
    if (Auth.isAuthenticate()) {
        return (
            <div id="blogContent">
                <h2> Blog</h2>
                <ListBlog ref={childRef} callbackParent={getEditBlog}/>
                <hr></hr>
                <CreateNewBlog ref={childRefCreateBlog} history={props.history} callbackParent={onCreateBlogSuccess} />
            </div>
        );
    } else {
        props.history.push('/');
        return <h2> biến</h2>
    }
    function onCreateBlogSuccess(event) {
        childRef.current.getData();
    }
    function getEditBlog(id){
        childRefCreateBlog.current.getBlogById(id);
    }
}
