import Header from "./components/Header";
import ListBooks from "./components/ListBooks";

function App() {
  return (
    <div className="container">
      <Header />
      <ListBooks />
    </div>
  );
}

export default App;


//GET

// https://anapioficeandfire.com/Documentation

// async function getUsers() {
//   let url = 'https://www.anapioficeandfire.com/api/books';
//   try {
//       let res = await fetch(url);
//       return await res.json();
//   } catch (error) {
//       console.log(error);
//   }
// }
// let users = await getUsers();
