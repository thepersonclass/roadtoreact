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

const REMOVE_GAME = 'REMOVE_GAME';

const gamesReducer = (state, action) => {
  switch (action.type) {
    case 'GAMES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'GAMES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'GAMES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case REMOVE_GAME:
      return {
        ...state,
        data: state.data.filter(
          (game) => action.payload.nsuid_na !== game.nsuid_na
        ),
      };
    default:
      throw new Error();
  }
}

const API_ENDPOINT = 'http://localhost:3000/data/content.json'

const App = () => {

  const [games, dispatchGames] = React.useReducer(
    gamesReducer,
    { data: [], isLoading: false, isError: false }
  );

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'mercenaries');

  React.useEffect(() => {
    if (!searchTerm) return;

    fetch(`${API_ENDPOINT}`)
      .then((response) => response.json())
      .then((result) => {
        dispatchGames({
          type: 'GAMES_FETCH_SUCCESS',
          payload: result.rows.filter((game) => game.title.toLowerCase().includes(searchTerm.toLowerCase())),
        })
      })
      .catch(() => 
        dispatchGames({ type: 'GAMES_FETCH_FAILURE' }));
    }, [searchTerm]);

  const handleRemoveGame = (item) => {
    dispatchGames({
      type: REMOVE_GAME,
      payload: item,
    });
  }

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

      {games.isError && <p>Something went wrong...</p>}

      {games.isLoading ? (
        <p>Loading...</p>
      ) : (
        <List 
          list={games.data} 
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
    <span>Title: {item.title}</span>
    <span>Price: {item.eshop_list_price_na}</span>
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
