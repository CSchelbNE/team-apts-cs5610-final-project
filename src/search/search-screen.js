import React, {useEffect, useState} from "react";
import NavigationSidebar from "../navigation-sidebar/nav-bar";
import {useDispatch, useSelector} from "react-redux";
import {findAllListingsThunk} from "../services/discogs-thunk";
import SearchItem from "./search-item";
import CreateListingModal from "./create-listing-modal";
import Button from "react-bootstrap/Button";

const SearchScreen = () => {
    const dispatch = useDispatch();
    const listings = useSelector(state => state.discogs.listings);
    const [uri, setUri] = useState(window.location.href.split("/").slice(-1)[0]);
    const [modalShow, setModalShow] = React.useState(false);
    if (window.location.href.split("/").slice(-1)[0] !== uri){
        setUri(window.location.href.split("/").slice(-1)[0]);
    }
    useEffect( () => {
        // Find the listing based on the url
        dispatch(findAllListingsThunk(uri));
    },[uri]);
    return (
    <>
        {!listings.length ?
            <div>
            <div>
                <div className="w-100">
                    <NavigationSidebar/>
                </div>
            </div>
            <div>
                <h1 className="bg-white">Search Results</h1>
                Sorry! No listing for this record were found!
            </div>
        </div>
            :
           <div>
            <div>
                <div className="w-100">
                    <NavigationSidebar/>
                </div>
            </div>
            <div>
                <h1 className="bg-white">Search Results</h1>
                <h6>{listings.length + " results were found for" + listings[0].record_name}</h6>
                {listings.map((e) => <SearchItem listing={e}/>)}
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    Create Listing
                </Button>
                <CreateListingModal  show={modalShow}
                                     onHide={() => setModalShow(false)}/>
            </div>
        </div>
    }
    </>
    );
}
export default SearchScreen;