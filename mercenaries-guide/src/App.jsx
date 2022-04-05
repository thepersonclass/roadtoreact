import React from 'react';
import './App.css';

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) ?? initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const App = () => {

  const initialGames = [ {
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
  }];

  const [games, setGames] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  getAsyncGames = () =>
    new Promise((resolve) => 
      setTimeout(
        () => resolve({ data: { games: initialGames }}),
        2000
      )
    );

  const getAsyncGames = () =>
    new Promise((resolve) => 
      setTimeout(
        () => resolve({ data: { games: initialGames }}),
        2000
      )
  );

  React.useEffect(() => {
    setIsLoading(true);

    getAsyncGames().then(result => {
      setGames(result.data.games);
      setIsLoading(false);
    })
    .catch(() => setIsError(true));
  }, []);

  const handleRemoveGame = (item) => {
    const newGame = games.filter(
      (game) => item.objectID !== game.objectID
    );

    setGames(newGame);
  }

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'mercenaries');
  
  const searchedGames = games.filter(({title}) => title.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  return (
    <div>
      <h1>Mercenaries Titles</h1>

      <InputWithLabel
       id="search"
       value={searchTerm} 
       onInputChange={handleSearch} 
       isFocused
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <hr />

      {isError && <p>Something went wrong...</p>}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <List 
          list={searchedGames} 
          onRemoveItem={handleRemoveGame} 
        />
      )}

    </div>
  )
}

const List = ({ list, onRemoveItem }) => {
  return (
    <ul>
       {list.map((item) => {
         return (
          <Item 
            key={item.objectID} 
            item={item}
            onRemoveItem={onRemoveItem} 
          />
        );
       })}
    </ul>
  );
}

const Item = ({ item, onRemoveItem }) => (
  <li> 
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
    <span>
      <button type="button" onClick={() => onRemoveItem(item)}>
        Dismiss
      </button>
    </span>
  </li>
);

const InputWithLabel = ({ 
  id, 
  value, 
  type = 'text',
  onInputChange,
  isFocused,
  children }) => {
  
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input 
        ref={inputRef}
        id={id}
        type={type} 
        value={value}
        onChange={onInputChange} />  
    </>
  );
};


export default App;
