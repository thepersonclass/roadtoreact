import './App.css';

const App = () => (
   <div>
    <h1>Mercenaries Titles</h1>

    <Search />

     <hr />

     <List />

   </div>
);

const List = () => {

  const list = [
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
    <ul>
       {list.map((item) => {
         return (
          <li key={item.objectID}> 
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
          </li>
         );
       })}
    </ul>
  );
}

const Search = () => {
  const handleChange = (event) => {
    console.log(event.target.value);
  }

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange} />  
    </div>
  );
}

export default App;
