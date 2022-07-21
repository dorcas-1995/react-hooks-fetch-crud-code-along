import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  //Adding useEffect hook
  // Updating state by passing the array of items to setItems
  useEffect(() =>{
    fetch("http://localhost:4000/items",
   )
    .then((response)=>response.json())
    .then((items) => setItems(items))
    .catch(err => {
      throw new Error(err)
    });
  }, []);

  function handleUpdateItem(updatedItem){
    // console.log("In shopping cart:",updatedItem)
    const updatedItems = items.map((item) => {
      if(item.id === updatedItem.id){
        return updatedItem;
      }
      else{
        return item;
      }
    })
    setItems(updatedItems);
  }

  function handleAddItem(newItem){
    // console.log("In Shopping List:", newItem);
    setItems([...items,newItem])
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item 
          key={item.id} 
          item={item} 
          onUpdateItem={handleUpdateItem}
          onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;