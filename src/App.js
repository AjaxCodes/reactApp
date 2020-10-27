import React from 'react';
import './index.css';
import {useState} from 'react';
import {CSSTransition} from 'react-transition-group';
import axios from 'axios';
import { Component } from 'react';
const API_URL = 'www.devcodecampmusiclibrary.com/api/music';

// navbar / dropdowm menu

function App() {
  return (
   <div>
     <Navbar>
      <navItem icon="album"/>
      <navItem icon="artist"/>
      <navItem icon="genre"/>
      <navItem icon="song title"/>
      <navItem icon="release date"/>
    <DropDownMenu/>
    </Navbar>
    <AxiosTable/>
   </div> 
    
  );
}
function DropDownMenu(){
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  
  function setHeight(el){
    const height = el.offsetHeight;
    setMenuHeight(height);
  }
  function DropdownItem(props){
      return(
        <a href="#" className="menuItem" onClick={()=> props.goToMenu && setActiveMenu()}>
          <span className="icon-Button">{props.leftIcon}</span>
          {props.children}
          <span className="icon-Button">{props.rightIcon}</span>
        </a>
      );
}
  return(
    <div className="dropdown" style={{height:menuHeight}}>
      <CSSTransition 
      in={activeMenu === 'main'} 
      unmountOnExit 
      timeout={700}
      className="menu-primary"
      onEnter={setMenuHeight}
      > 
        <div className="menu">
          <DropdownItem>Artist</DropdownItem>
          <DropdownItem>genre</DropdownItem>
          <DropdownItem>release date</DropdownItem>
          <DropdownItem>song</DropdownItem>
        </div>
    </CSSTransition>
    <CSSTransition 
      in={activeMenu === 'settings'} 
      unmountOnExit 
      timeout={700}
      className="menu-secondary"
      > 
      <div className="menu">
        <DropdownItem>Settings</DropdownItem>
   </div>
    </CSSTransition>
  </div>
  );
}

function Navbar(props){
  return(
    <nav className="navbar">
      <ul className="navbar-nav"> { props.children }</ul>
    </nav>

  );
}

function NavItem(props){
  const [open, setOpen] =useState(false);
  return(
    <li className="nav-item">
      <a href="#" className="icon-Button" onClick={()=> setOpen(!open)}>
        {props.icon}
        </a>
        {open && props.children}
    </li>

  );
}
// axios with table 


class AxiosTable extends Component {
  state = {
    music: []
  }
  componentDidMount() {
    const url = `${API_URL}/users/`;
    axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ music: data })
      console.log(this.state.music)
     })
  }
  buildTable(){
    let tableRows ="";
  for(let i = 0; i < this.state.music.length; i++){
    tableRows +=  '<tr>' + '<td>' + this.state.music[i].title + '</td>'
      +'<td>' + this.state.music[i].album + '</td>' + '<td>' + this.state.music[i].artist + '</td>'
      + '<td>' + this.state.music[i].genre + '</td>' + '<td>' + this.state.music[i].releaseDate + '</td>'
      + '</tr>';
  }

  }

  render(){
    let table = this.buildTable();
      return (
       <table id="table">
    <tr>
        <th id="title">Song</th>
        <th id="artist">Artist</th>
        <th id="genre">Genere</th>
        <th id="album">Album</th>
        <th id="release date">Release Date</th>
    </tr> 
    {table}
 </table>
 
      );
    }
  
}




export default App;
