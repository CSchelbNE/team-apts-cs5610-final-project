import React, {useEffect} from "react";
import "./index.css";
import RecordGridItem from "../home/record-grid-item";
import {useDispatch, useSelector} from "react-redux";
import {getWishlistByUsernameThunk} from "../services/wishlist-thunk";
import {uuid4} from "uuid4";

const WishListComponent = ({currentUser}) => {
    const {wishlist_records} = useSelector(state => state.wishlist);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWishlistByUsernameThunk(currentUser.username));
    }, []);



    return(
        <>
            <ul className="list-group">
                {
                    wishlist_records.length === 0 &&
                    <p className="p-3">There are no wishlist to show...</p>
                }
                {   wishlist_records.length > 0 &&
                    wishlist_records.map(record => <RecordGridItem key={uuid4()} record={record}/>)
                }
            </ul>
        </>
    );
}
export default WishListComponent;