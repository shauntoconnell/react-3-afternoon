import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      displayPosts: []
    };

    this.fetchPosts = this.fetchPosts.bind( this );
    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.search = this.search.bind( this );
  }
  
  componentDidMount() {
    this.fetchPosts()
  }

  fetchPosts(){
    axios.get('https://practiceapi.devmountain.com/api/posts').then(response => {
      this.setState({
        posts: response.data,
        displayPosts: response.data
      })
    })
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text}).then(response => {
      this.setState({
        posts: response.data
      })
    })
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`).then(response => {
      this.setState({
        posts: response.data
      })
    })
  }

  createPost(text) {
    axios.post('https://practiceapi.devmountain.com/api/posts', {text}).then(response => {
      this.setState({
        posts: response.data
      })
    })
  }

  search(text) {
    this.setState({
      displayPosts: this.state.posts.filter(e => e.text.includes(text))
    })
  }

  render() {
    const { displayPosts } = this.state;
    
    return (
      <div className="App__parent">
        <Header search={this.search}/>

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>
          {displayPosts.map(post => (
            <Post
            key={post.id}
            text={post.text}
            date={post.date}
            updatePostFn={this.updatePost}
            deletePostFn={this.deletePost}
            id={post.id}/>
          ))}
          
        </section>
      </div>
    );
  }
}

export default App;
