import React, { useRef } from "react"
import HttpService from "../Http/HttpService";
import "../Blog/ListBlog.css"
import { AlertModify } from "../Commmon/Alert"
export class ListBlog extends React.Component {
    state = {
        loading: true,
        list: [],
        inputWithMouseOn: -1
    }

    constructor() {
        super();
        this.child = React.createRef();
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
    }
    async getData() {
        this.setState({ loading: true });
        await HttpService.readBlogData().then(snapshot => {
            let data = snapshot.val();
            let list = [];
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const element = data[key];
                    list.push(element);
                }
            }
            this.setState({ list: list });
            this.setState({ loading: false });
        })
    }
    async componentDidMount() {
        await this.getData();
    }
    onMouseEnter(event) {
        if (event.currentTarget.dataset.id) {
            this.setState({ inputWithMouseOn: (event.currentTarget.dataset.id) })
        }
    }
    onMouseLeave() {
        this.setState({ inputWithMouseOn: -1 })
    }
    onClickEdit(event) {

        this.onEditBlog(event);
    }
    onEditBlog(event) {
        if (event.currentTarget.dataset.id) {
            this.props.callbackParent(event.currentTarget.dataset.id);
        }
    }
    onClickDelete(event) {
        if (event.currentTarget.dataset.id) {
            this.child.current.handleShow("Delete blog "+event.currentTarget.dataset.title, "Are you want to delete this blog?", true);
        }
       
    }
    render() {
        return (
            <div>
                {
                    this.state.loading ?
                        <div className="row">
                            <div className="col-md-12">
                                <div class="loader"></div>
                            </div>
                        </div> :
                        <div className="row">
                            {
                                this.state.list.map((element, i) => {
                                    if (element) {
                                        return (<div className="col-sm-6">
                                            <div className="card card-modify" data-id={element.id} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}  >
                                                <div className="card-body">
                                                    <h5 className="card-title">{element.title}</h5>
                                                    <p className="card-text">{element.preview.substring(0, 100)}</p>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <a href={`/blogs/${element.id}`} className="btn btn-dark">Read</a>
                                                        </div>
                                                        <div className="col-sm-6" style={{ visibility: this.state.inputWithMouseOn === element.id ? "visible" : "hidden" }}>
                                                            <button type="button" className="btn btn-outline-dark" data-id={element.id} onClick={this.onClickEdit}>Edit</button>
                                                            <button type="button" className="btn btn-outline-danger" data-id={element.id} data-title={element.title} onClick={this.onClickDelete} >Delete</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>);
                                    } else {
                                        return <h3 className="col-md-12">No Post</h3>
                                    }
                                })
                            }
                            <AlertModify ref={this.child} />
                        </div>

                }
            </div>
        );
    }





}

