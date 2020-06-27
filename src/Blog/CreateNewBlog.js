import React from "react"
import CKEditor from 'ckeditor4-react';
import _uniqueId from 'lodash/uniqueId';
import HttpService from "../Http/HttpService";
import { generateKey } from "../Commmon/Unique";
export class CreateNewBlog extends React.Component {
    state = {
        id: generateKey("blog"),
        title: "",
        preview:"",
        content: "",
        author: 1,
        titleComponent:"Add New Blog",
        isEdit: false
    }
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.getBlogById =  this.getBlogById.bind(this);
        this.addNewBlogOnClick = this.addNewBlogOnClick.bind(this);
        this.onClear = this.onClear.bind(this);
    }
    handleChange(event){
        let key = event.currentTarget.dataset.key;
        if(key){
            this.setState({ [key] : event.target.value})
        }
    }
    handleChangeContent(event){
        this.setState({ content : event.editor.getData()})
    }
    onCreateSuccess(){
        this.props.callbackParent("abc");
    }
    async getBlogById(id){
        this.setState({ isEdit : true});
        await HttpService.readBlogById(id).then(snapshot=>{
            var res = snapshot.val();
            this.setState({ titleComponent : "Edit blog "+res.title})
            this.setState({ id : res.id});
            this.setState({ title : res.title});
            this.setState({ content : res.content});
            this.setState({ preview : res.preview});
            console.log(this.state);
        })
    }
    onClick(){
        HttpService.writeBlogData(this.state.id,this.state.title, this.state.author, this.state.content, this.state.preview);
        this.setState({id: generateKey("blog"), title: "", content: "",  preview: ""});
        this.onCreateSuccess();
    }
    addNewBlogOnClick(){
        this.setState({ titleComponent : "Add New Blog"})
        this.setState({ isEdit : false})
       this.onClear();
        this.setState({ id : generateKey("blog")});
    }
    onClear(){
        this.setState({ title : ""});
        this.setState({ content : ""});
        this.setState({ preview : ""});
    }
    render() {
        return (
            <div>
                <h3>{this.state.titleComponent}</h3>
                <h5 className="card-title">Title Blog</h5>
                <input type="text" className="form-control" placeholder="Title Blog" value={this.state.title}  data-key="title" onChange={this.handleChange} />
                <hr></hr>
                <h5 className="card-title">Preview Blog</h5>
                <textarea className="form-control" value={this.state.preview}  data-key="preview" onChange={this.handleChange}></textarea>
                <hr></hr>
                <h5 className="card-title">Blog Content</h5>
                <CKEditor
                    data={this.state.content} data-key="content" onChange={this.handleChangeContent} 
                />
                <hr></hr>
                <button className="btn btn-dark margin-right-10" onClick={this.onClick}>Save Data</button>
                <button className="btn btn-warning margin-right-10"  onClick={this.onClear}>Clear Data</button>
                <button className="btn btn-danger" style={{ visibility: this.state.isEdit? 'visible' : 'hidden'}} onClick={this.addNewBlogOnClick}>Create new blog</button>
            </div>
        )
    }
} 