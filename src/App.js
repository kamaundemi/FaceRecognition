import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Clarifai from 'clarifai';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import './App.css';

const app = new Clarifai.App({
  apiKey: 'Your apiKey from clarifai.com'
});

const ParticlesOptions = {
  particles: {
                 number:{
                  value: 30,
                  density:{
                    enable:true,
                    value_area:800

                  }
                 }
                }
              }
// function App() {
  class App extends Component{
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route:'signin',
      isSignedIn: false, 
      user: {
        id:'',
        name:'',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser =(data) =>{
    this.setState({user:{
       id: data.id,
        name:data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined

    }})
  }
//connecting the client to the server
// componentDidMount(){
//   fetch('http://localhost:5000')
// .then(response => response.json())
// .then(console.log)
// }

 calculateFaceRecognition = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});


  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
    // console.log('event');
  }

  onButtonSubmit = () => {
    this.setState({imageUrl:this.state.input});
    // console.log('click');
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
    .then(response =>{
      if(response){
        fetch('http://localhost:5000/image', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body:JSON.stringify({
      id: this.state.user.id
    })})
        .then(response => response.json())
        .then(count => {
          this.setState({user: {
            entries:count
          }})
        })
      }
    
     this.displayFaceBox(this.calculateFaceRecognition(response))})
      // do something with response
      // console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
    .catch(err => console.log(err));
  
  

}
onRouteChange =(route) =>{
  if(route === 'signout'){
    this.setState({isSignedIn:false})
    // route:SignIn
  }
  else if(route === 'home'){
    this.setState({isSignedIn:true})

  }
  this.setState({route:route});
}

  
  render(){
   const {isSignedIn, imageUrl, route, box} = this.state;
  return (
    <div className="App">
    <Particles className='particles' 
                params={
                  ParticlesOptions
                } />
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
      {route ==='home' ?
        <div>
            <Logo/>
            <ImageLinkForm 
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
                />
            <Rank 
            name ={this.state.user.name} 
            entries={this.state.user.entries}
            />
            <FaceRecognition box={box}imageUrl={imageUrl}/>
        </div>
        : (
            route === 'signin'?
            <SignIn loadUser={this.loadUser}onRouteChange={this.onRouteChange}/>
            :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>

          )

        
      
      }


    </div>
  );
}
}
export default App;
