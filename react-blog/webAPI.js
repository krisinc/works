import axios from 'axios'

export const getPosts = () => axios.get('http://45.55.26.18:3310/posts')

export const getPost = postId => axios.get('http://45.55.26.18:3310/posts/' + postId)
