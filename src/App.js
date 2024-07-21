import {Component} from 'react';
import './App.css';
import SearchBox from "./components/search-box/search-box.component";
import CardList from "./components/card-list/card-list.component";

class App extends Component{
  constructor() {
    super();
    this.state = {
      monsters: [] ,
        searchField: ''
    };
    //Initialize the empty array
  }

  search_Fun = (event) => {
      //console.log(event) -> See what's there in there
      const searchField = event.target.value.toLowerCase();
      this.setState(() => {
          return {searchField}
      })
  }

  componentDidMount() {
    //This is a lifecycle method.
    fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((users) => this.setState(() => {
          return {monsters: users};
        }))
  }

  render() {
      //Using ES-6 Destructuring.
      const {monsters, searchField} = this.state;
      const { search_Fun } = this;
      const filtered_Monsters = monsters.filter((monster) => {
          return monster.name.toLowerCase().includes(searchField);
      })
      return (
          //Explicitly telling my component that what I'm rendering.
          <div className="App">
              <h1 className='app-title'>Monsters Rolodex</h1>
              <SearchBox
                  onChangeHandler={ search_Fun }
                  className='search-monsters'
                  placeholder='Search Monsters...'
              />
              <CardList monsters={filtered_Monsters}/>
          </div>
      );
    }
}

export default App;
