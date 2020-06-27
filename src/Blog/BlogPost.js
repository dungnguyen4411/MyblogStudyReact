import React from 'react';
import HttpService from '../Http/HttpService';
export default class BlogPost extends React.Component {
    state = {
        title: "",
        preview: "",
        content: "",
        author: 1,
        isLoading: true
    }
    async componentDidMount() {
        console.log(this.props.blogData.blogid);
        var id = this.props.blogData.blogid;
        await HttpService.readBlogById(id).then(snapshot => {
            var res = snapshot.val();
            this.setState({ id: res.id });
            this.setState({ title: res.title });
            this.setState({ content: res.content });
            this.setState({ preview: res.preview });
            this.setState({ isLoading: false });
        })
    }
    render() {
        return (
            <div class="container" style={{padding:"10px"}}>
                {
                    !this.state.isLoading ?

                        <>
                            <h1 class="mt-5">TITLE : {this.state.title}</h1>
                            <hr/>
                            <p class="lead">PREVIEW : {this.state.preview}</p>
                            <hr/>
                            <p class="lead" dangerouslySetInnerHTML={{
                                __html: this.state.content
                            }}></p>
                            <hr/>
                        </>
                        :
                        <div className="row">
                            <div className="col-md-12">
                                <div class="loader"></div>
                            </div>
                        </div>
                }

            </div>
        );
    }
}


