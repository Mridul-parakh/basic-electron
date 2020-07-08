import React,{Component} from 'react';
//import logo from './logo.svg';
import {Link} from 'react-router-dom'
import './App.css';
import axios from 'axios';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class App extends Component {
  state = {
    posts: [],
    status:""
  }
  componentDidMount() {
    //this.initMenu();

    axios.get("https://reddit.com/r/aww.json?raw_json=1")
      .then(response => {
        this.setState({
          posts: response.data.data.children
        })
        console.log(response)
      })
      .catch(error => {
        console.log(error);
      })

      axios.get("/hel")
        .then(res=>{console.log(res)
          // this.setState({
          //   status:data.success
          // })
        })
  }
  showImage = image => {
    ipcRenderer.send('toggle-image',image);
  }

  render(){
  return (
    <div className="App">
      <h1>hello</h1>
      <ul className="list-group list-group-flush">
      {this.state.posts.map((post,index) =>
          <Link className="" key={index} to="/image"><li
            key={index}
            className="list-group-item flex-container"
            onClick={() => this.showImage(post.data.preview.images[0].source.url)}
          > 
          <img key={index} src={post.data.thumbnail} alt="thumb" className="thumbnail" />
            <div>{post.data.title}</div>
          
            
          </li></Link>
          )}

          
        </ul>

    </div>
  );
  }
}

export default App;
