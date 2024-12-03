import AddTask from "./components/AddTask";
import CardComponent from "./components/Card";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <>
      <Navbar />
      <SearchBar />
      <AddTask />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 p-6 max-w-screen-xl mx-auto">
        <CardComponent />
      </div>
    </>
  );
}

export default App;
