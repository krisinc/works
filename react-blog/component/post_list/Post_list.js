import React, { Component } from 'react';
import './post_list.css';

class PostList extends Component {
    componentDidMount() {
        this.props.getPostList()
    }

    render() {
        const {history, posts} = this.props
        return (
            <div className="post">
                <h1>Posts</h1>
                <div className="post__list">
                    {posts.map(post => (
                        <div className="post__item" key={post.id} onClick={()=> {
                            history.push('/post/' + post.id)
                        }}>
                            <div className="post__item__id">{post.id}</div>
                            <div className="post__item__title">{post.title}</div>
                            <div className="post__item__body">{post.body}</div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default PostList;