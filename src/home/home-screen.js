import React, {useEffect} from "react";
import NavigationSidebar from "../navigation-sidebar/nav-bar";
import "./index.css";
import SuggestedComponent from "./suggested-component";
import UsersListComponent from "../users/users-list";
import {useDispatch, useSelector} from "react-redux";
import WishListComponent from "../wish-list/wish-list-component";
import ModalWrapperButton from "../components/modal-wrapper-button";
import {getRecentListingsThunk} from "../services/discogs-thunk";
import homeScreenImg from "../images/home-screen.jpg"
// http://www.vinylstyl.com/wp-content/uploads/sites/4/2016/02/LPcollage-1.jpg
// https://townsquare.media/site/295/files/2021/01/psych.jpg
const HomeScreen = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getRecentListingsThunk());
    }, []);
    const {currentUser} = useSelector(state => state.users);
    const {suggested} = useSelector(state => state.discogs);


    return (
        <div className="">
            <NavigationSidebar/>
            <div className="container mt-2">
                <div className="position-relative">
                    <img src={homeScreenImg} className="w-100 wd-banner-image-format"/>
                    <div className="wd-title-format">
                        Vintage Vinyl
                    </div>
                    <div className="wd-title2-format">
                        Review Your Favorite Albums
                    </div>
                    <div className="wd-title3-format">
                        Buy & Sell
                    </div>
                </div>
               
                <div className="mt-3">
                    <h3 className="font-weight-bold">Suggested Albums</h3>
                    <div>
                        <SuggestedComponent suggested={suggested}/>
                    </div>

                </div>
                <div className="mt-3">
                    <h3 className="font-weight-bold">Recent Users</h3>
                    <div>
                        <UsersListComponent/>
                    </div>
                </div>
                <div>
                    {
                        currentUser &&
                        <div className="mt-3  mb-3">
                            <h3 className="font-weight-bold">Wishlist</h3>
                            <div>
                                <WishListComponent key={currentUser._id} currentUser={currentUser}/>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
export default HomeScreen;