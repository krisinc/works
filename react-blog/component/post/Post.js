import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './post.css';
import { getPost } from '../../webAPI';

class Post extends Component {
    constructor() {
        super()
        this.state = {
            post: {}
        }
    }

    componentDidMount() {
        const postId = this.props.match.params.postId
        getPost(postId)
            .then(response => {
                this.setState({
                    post: response.data
                })
            })
    }

    render() {
        const { post } = this.state
        return (
            <div className="post">
                <h1>Posts</h1>
                <Link className="btn" to="/post">Back</Link>
                <div className="post__article">
                    <h1>{!post.title ? 'loading...' : post.title}</h1>
                    <p>{post.body}</p>
                </div>
            </div>
        )
    }
}

export default Post;