import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchTask } from "@/redux/counter/TaskSlice";

function SearchBar() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    dispatch(searchTask(searchTerm)); 
  };

  return (
    <div className="flex flex-col w-full max-w-screen mx-auto px-4 sm:px-6 lg:px-10 my-4 sm:my-6 lg:my-7">
      <div className="relative">
        <Input
          id="search"
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search Task..."
          className="w-full pl-10 py-2 text-sm sm:text-base lg:text-lg"
        />
      </div>
    </div>
  );
}

export default SearchBar;
