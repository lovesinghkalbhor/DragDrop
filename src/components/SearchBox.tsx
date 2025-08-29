// import React from "react";
import { useState, useEffect } from "react";

export default function searchBox() {
  //   create a dummy object which will have fruits names
  const fruits = [
    { name: "Apple" },
    { name: "Banana" },
    { name: "Orange" },
    { name: "Mango" },
    { name: "Pineapple" },
    { name: "Grapes" },
    { name: "Strawberry" },
    { name: "Blueberry" },
    { name: "Watermelon" },
    { name: "Papaya" },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [filteredFruits, setFilteredFruits] = useState(fruits);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchQuery]);

  useEffect(() => {
    // if (searchQuery.length < 3) {
    //   return;
    // }

    if (searchQuery.trim() === "") {
      setFilteredFruits(fruits);
    } else {
      setFilteredFruits(
        fruits.filter((fruit) =>
          fruit.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        )
      );
    }
  }, [debouncedSearchQuery, fruits]);

  return (
    <div>
      <input
        type="text"
        id="searchInput"
        placeholder="Search for fruits.."
        title="Type in a name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul id="fruitsList">
        {filteredFruits.map((fruit, index) => (
          <li key={index}>{fruit.name}</li>
        ))}
      </ul>
    </div>
  );
}
