import { useState } from "react";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { setActiveFilter } from "@/redux/counter/TaskSlice";

function Navbar() {
  const dispatch = useDispatch();
  const activeFilter = useSelector((state) => state.tasks.activeFilter);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const buttonLabels = ["All Tasks", "Completed Tasks", "Pending Tasks"];

  const handleButtonClick = (buttonName) => {
    dispatch(setActiveFilter(buttonName));
  };

  return (
    <header className="bg-white text-gray-800 border-b shadow-md sm:text-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Task Management Dashboard</h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 cursor-pointer ">
          {buttonLabels.map((label) => (
            <Button
              key={label}
              bgColor={activeFilter === label ? "bg-blue-500" : "bg-transparent"}
              textColor={activeFilter === label ? "white" : "black"}
              paddingX="2"
              marginX="1"
              onClick={() => handleButtonClick(label)}
            >
              {label}
            </Button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            bgColor="bg-transparent"
            textColor="gray-800"
            paddingX="2"
            marginX="0"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden border-t bg-white">
          <ul className="flex flex-col space-y-4 py-4 px-6">
            {buttonLabels.map((label) => (
              <Button
                key={label}
                bgColor={activeFilter === label ? "bg-blue-500" : "bg-transparent"}
                textColor={activeFilter === label ? "white" : "black"}
                paddingX="2"
                marginX="1"
                onClick={() => handleButtonClick(label)}
              >
                {label}
              </Button>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
