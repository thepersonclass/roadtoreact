import React from 'react';
import './App.css';

const App = () => {
  const games = [
    {
      title: 'Mercenaries Saga: Will of the White Lions',
      url: 'https://www.nintendo.com/store/products/mercenaries-saga-chronicles-switch/',
      publisher: 'Circle Ent.',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Mercenaries Saga 2: Order of the Silver Eagle',
      url: 'https://www.nintendo.com/store/products/mercenaries-saga-chronicles-switch/',
      publisher: 'Circle Ent.',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
    {
      title: 'Mercenaries Saga 3: Gray Wolves of War',
      url: 'https://www.nintendo.com/store/products/mercenaries-saga-chronicles-switch/',
      publisher: 'Circle Ent.',
      num_comments: 2,
      points: 5,
      objectID: 2,
    },
    {
      title: 'Mercenaries Blaze: Dawn of the Twin Dragons',
      url: 'https://www.nintendo.com/store/products/mercenaries-blaze-dawn-of-the-twin-dragons-switch/?sid=164a9ed8cd472b0c3becf62dfeacf67e__ga',
      publisher: 'Circle Ent.',
      num_comments: 2,
      points: 7,
      objectID: 3,
    },
    {
      title: 'Mercenaries Rebirth: Call of the Wild Lynx',
      url: 'https://www.nintendo.com/store/products/mercenaries-rebirth-call-of-the-wild-lynx-switch/?sid=9e76add5afc193e4eeb6755d5ffe9def__ga',
      publisher: 'Circle Ent.',
      num_comments: 2,
      points: 8,
      objectID: 4,
    }
  ];

  return (
    <div>
      <h1>Mercenaries Titles</h1>

      <Search />

      <hr />

      <List list={games}/>

    </div>
  )
}

const List = (props) => {
  return (
    <ul>
       {props.list.map((item) => {
         return (
          <Item key={item.objectID} item={item} />
        );
       })}
    </ul>
  );
}

const Item = (props) => {
  return (
    <li> 
      <span>
        <a href={props.item.url}>{props.item.title}</a>
      </span>
      <span>{props.item.author}</span>
      <span>{props.item.num_comments}</span>
      <span>{props.item.points}</span>
    </li>
  );
}

const Search = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  }

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange} />  

      <p>
        Searching for <strong>{ searchTerm }</strong>
      </p>
    </div>
  );
}

export default App;
