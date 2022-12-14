import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    addToShoppingCart,
    createEmptyShoppingCart, deleteFromShoppingCart,
    getShoppingCartById
} from "./shopping-cart-services";

export const getShoppingCartByIdThunk = createAsyncThunk(
    "cart/getCartById", async (userId) => {
        return await getShoppingCartById(userId);
    }
)

export const createEmptyShoppingCartThunk = createAsyncThunk(
    "cart/createEmpty", async (userId) => {
        return await createEmptyShoppingCart(userId);
    }
)

export const addToShoppingCartThunk = createAsyncThunk(
    "cart/addNewItem", async ({userId, listing}) => {
        return await addToShoppingCart({userId, listing});
    }
)

export const deleteFromShoppingCartThunk = createAsyncThunk(
    "cart/deleteItem", async ({userId, listing}) => {
        return await deleteFromShoppingCart({userId, listing});
    }
)