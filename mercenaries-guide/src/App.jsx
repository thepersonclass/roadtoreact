import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import styles from './App.module.css';
import { ReactComponent as Check } from '../src/img/check.svg';

const StyledContainer = styled.div`
  height: 100vw;
  padding: 20px;

  background: #83a4d4;
  background: linear-gradient(to left, #b6fbff, #83a4d4);

  color: #171212;
`;

const StyledHeadlinePrimary = styled.h1`
  font-size: 48px;
  font-weight: 300;
  letter-spacing: 2px;
`;

const StyledItem = styled.li`
  display: flex;
  align-items: center;
  padding-bottom: 5px;
`;

const StyledColumn = styled.span`
  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  a {
    color: inherit;
  }

  width: ${(props) => props.width};
`;

const StyledButton = styled.button`
  backgound: transparent;
  border: 1px solid #171212;
  padding: 5px;
  cursor: pointer;

  transition: all 0.1s ease-in;
  
  &:hover {
    background: #171212;
    color: #ffffff;
  }
`;

const StyledButtonSmall = styled(StyledButton)`
  padding: 5px;
`;

const StyledButtonLarge = styled(StyledButton)`
  padding: 10px;
`;

const StyledSearchForm = styled.form`
  padding: 10px 0 20px 0;
  display: flex;
  align-item: baseline;
`;

const StyledLabel = styled.label`
  border-top: 1px solid #171212;
  border-left: 1px solid #171212;
  padding-left: 5px;
  font-size: 24px;
`;

const StyledInput = styled.input`
  border: none;
  border-bottom: 1px solid #171212;
  background-color: transparent;

  font-size: 24px;
`;

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
    <StyledContainer>
      <StyledHeadlinePrimary>Mercenaries Titles</StyledHeadlinePrimary>

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

    </StyledContainer>
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
  <StyledItem> 
    <StyledColumn width="40%">Title: {item.title}</StyledColumn>
    <StyledColumn width="30%">Price: {item.eshop_list_price_na}</StyledColumn>
    <StyledColumn width="10%">
      <StyledButtonSmall 
        type="button" 
        onClick={() => onRemoveItem(item)}
      >
        <Check height="18px" width="18px" />
      </StyledButtonSmall>
    </StyledColumn>
  </StyledItem>
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
      <StyledLabel htmlFor={id} className={styles.label}>{children}</StyledLabel>
      &nbsp;
      <StyledInput 
        ref={inputRef}
        id={id}
        type={type} 
        value={value}
        onChange={onInputChange}
        className={styles.input} 
      />  
    </>
  );
};

const SearchForm = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
}) => (
  <StyledSearchForm onSubmit={onSearchSubmit}>
    <InputWithLabel
      id="search"
      value={searchTerm}
      isFocused
      onInputChange={onSearchInput}
    >
      <strong>Search:</strong>
    </InputWithLabel>

    <StyledButtonLarge 
      type="submit" 
      disabled={!searchTerm}
    >
      Submit
    </StyledButtonLarge>
  </StyledSearchForm>
)


export default App;
