import React, { Component } from 'react';
import axios from 'axios';
import './home.css';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            body: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = () => {
        const { title, body } = this.state
        axios.post('http://45.55.26.18:3310/posts/', {
            title,
            body,
            author: 'krisinc'
        }).then(()=> {
            alert('Success!')
        }).catch(err => 'something went wrong:' + err)
    }

    render() {
        const { title, body } = this.state
        return (
            <div className="home">
                <h1>Home</h1>
                <div className="postbox">
                    <h2>Starting a new post!</h2>
                    <input name="title" placeholder="title" value={title} onChange={this.handleChange}/>
                    <br/>
                    <textarea name="body" placeholder="content" value={body} onChange={this.handleChange}/>
                    <br/>
                    <button className='btn' onClick={this.onSubmit}>Submit</button>
                </div>
            </div>
        )
    }
}

export default Home;