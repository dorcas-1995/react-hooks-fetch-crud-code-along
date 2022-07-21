// import { response } from "msw/lib/types";
import React from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {
  function handleAddItemToCart(){
    console.log("Clicked Item:", item);
    fetch(`http://localhost:4000/items/${item.id}`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application.json",
      },
      body:JSON.stringify({
        isInCart:!item.isInCart
      }),
      })
      .then((response)=>response.json())
      .then((updatedItem)=>onUpdateItem(updatedItem))
    
  }

  function handleDeleteClick(){
    console.log(item);
    fetch(`http://localhost:4000/items/${item.id}`,{
      method:"DELETE",      
    })
    .then((r)=>r.json())
    .then(()=>
    // console.log("deleted!")
    onDeleteItem(item)
    )
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button 
      className={item.isInCart ? 
      "remove" : "add"}
      onClick={handleAddItemToCart}

      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default Item