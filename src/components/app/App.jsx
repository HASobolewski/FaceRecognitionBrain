import React, { Component } from 'react';
import ParticlesBg from 'particles-bg';
import Navigation from '../navigation/Navigation.jsx';
import Signin from '../signin/Signin.jsx';
import Register from '../register/Register.jsx';
import Logo from '../logo/Logo.jsx';
import Rank from '../rank/Rank.jsx';
import ImageLinkForm from '../imagelinkform/ImageLinkForm.jsx';
import FaceRecognition from '../facerecognition/FaceRecognition.jsx';
import './App.css';
import 'tachyons';

const initialState = {
  box: {},
  imageUrl: null,
  input: '',
  isSignedIn: false,
  route: 'signin',
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  };
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }
  onInputChange = (event) => this.setState({input: event.target.value});
  onImageSubmit = () => {
    this.setState({box: {}, imageUrl: this.state.input});
    fetch(`${import.meta.env.VITE_BASE_URL}/clarifai`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(result => {
      if (result) {
        fetch(`${import.meta.env.VITE_BASE_URL}/image`, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => this.setState(Object.assign(this.state.user, { entries: count })));
        this.displayFaceBox(this.calculateFaceLocation(result));
      }
    })
    .catch(error => console.log('error', error));
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const height = Number(image.height);
    const width = Number(image.width);
    return {
      bottomRow: height - (clarifaiFace.bottom_row * height),
      leftColumn: clarifaiFace.left_col * width,
      rightColumn: width - (clarifaiFace.right_col * width),
      topRow: clarifaiFace.top_row * height
    };
  }
  displayFaceBox = (box) => this.setState({box: box});
  loadUser = (data) => this.setState({user: {
    id: data.id,
    name: data.name,
    email: data.email,
    entries: data.entries,
    joined: data.joined
  }});
  render() {
    const { isSignedIn, route, imageUrl, box } = this.state;
    return (
      <div className='app'>
        <ParticlesBg color="#FFFFFF" type="cobweb" bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home' ?
          <div>
            <Logo /> 
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onImageSubmit={this.onImageSubmit} onInputChange={this.onInputChange} />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div> : (
            route === 'register' ?
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> :
            <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
