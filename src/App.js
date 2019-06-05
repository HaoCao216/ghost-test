import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
    this.renderPost = this.renderPost.bind(this)
  }

  componentDidMount() {
    fetch("http://localhost:2368/ghost/api/v2/content/posts/?key=b3ae8fd18b62a69ae4bc2caff8")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.posts
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  renderPost(item) {
    return (
      <article>
        <a><img src={item.feature_image}/></a>
        <div className="body">
          <span>{item.title}</span>
          <p>{item.custom_excerpt}</p>
        </div>
      </article>
    )
  }

  render() {
    return (
      <div className="App">
        {
          this.state.isLoaded && this.state.items.map(item => this.renderPost(item))
        }
      </div>
    );
  }
}

export default App;
