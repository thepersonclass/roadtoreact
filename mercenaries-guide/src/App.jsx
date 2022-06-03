import React from 'react';
import axios from 'axios';
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

const API_ENDPOINT = 'https://localhost:7054/games?title='

const App = () => {

  const [games, dispatchGames] = React.useReducer(
    gamesReducer,
    { data: [], isLoading: false, isError: false }
  );

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'mercenaries');

  const [url, setUrl] = React.useState(
    `${API_ENDPOINT}${searchTerm}`
  );

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };

  const handleFetchStories = React.useCallback(() => {
    dispatchGames({ type: 'GAMES_FETCH_INIT'});

    axios
      .get(url)
      .then((result) => {
        dispatchGames({
          type: 'GAMES_FETCH_SUCCESS',
          payload: result.data,
        });
      })
      .catch(() => 
        dispatchGames({ type: 'GAMES_FETCH_FAILURE' })
      );
  }, [url]);

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveGame = (item) => {
    dispatchGames({
      type: REMOVE_GAME,
      payload: item,
    });
  }

  return (
    <div>
      <h1>Mercenaries Titles</h1>

      <InputWithLabel
       id="search"
       value={searchTerm} 
       onInputChange={handleSearchInput} 
       isFocused
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <button 
        type="button"
        disabled={!searchTerm}
        onClick={handleSearchSubmit}
      >
        Submit
      </button>

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
