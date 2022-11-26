import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const exsitingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const exsitingCartItem = state.items[exsitingCartItemIndex];

    let updatedItems;
    if (exsitingCartItem) {
      const updatedItem = {
        ...exsitingCartItem,
        amount: exsitingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[exsitingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  if (action.type === "REMOVE") {
    const exsitingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const exsitingCartItem = state.items[exsitingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - exsitingCartItem.price;
    let updatedItems;

    if (exsitingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...exsitingCartItem,
        amount: exsitingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[exsitingCartItemIndex] = updatedItem;
    }
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }
  return defaultState;
};

const CartProvider = (props) => {
  const [cartState, dispatchStateAction] = useReducer(
    cartReducer,
    defaultState
  );
  const addItemToCartHandler = (item) => {
    dispatchStateAction({ type: "ADD", item: item });
  };
  const removeItemToCartHandler = (id) => {
    dispatchStateAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
