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

  const handleSearchSubmit = (event) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);

    event.preventDefault();
  };

  const handleFetchStories = React.useCallback(async () => {
    dispatchGames({ type: 'GAMES_FETCH_INIT'});

    try {
      const result = await axios.get(url);

      dispatchGames({
        type: 'GAMES_FETCH_SUCCESS',
        payload: result.data,
      });
    }
    catch {
      dispatchGames({ type: 'STORIES_FETCH_FAILURE' });
    }
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
    <div className="container">
      <h1 className="headline-primary">Mercenaries Titles</h1>

      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />

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
  <li className="item"> 
    <span style={{ width: '40%' }}>Title: {item.title}</span>
    <span style={{ width: '30%' }}>Price: {item.eshop_list_price_na}</span>
    <span>
      <button 
        type="button" 
        onClick={() => onRemoveItem(item)}
        className="button button_small"
      >
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
      <label htmlFor={id} className="label">{children}</label>
      &nbsp;
      <input 
        ref={inputRef}
        id={id}
        type={type} 
        value={value}
        onChange={onInputChange}
        className="input" 
      />  
    </>
  );
};

const SearchForm = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
}) => (
  <form onSubmit={onSearchSubmit} className="search-form">
    <InputWithLabel
      id="search"
      value={searchTerm}
      isFocused
      onInputChange={onSearchInput}
    >
      <strong>Search:</strong>
    </InputWithLabel>

    <button 
      type="submit" 
      disabled={!searchTerm}
      className="button button_large"
    >
      Submit
    </button>
  </form>
)


export default App;
