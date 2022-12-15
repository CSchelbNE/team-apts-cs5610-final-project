import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ReviewsByUser from "../reviews/reviews-by-user";

import NavigationSidebar from "../navigation-sidebar/nav-bar";
import {
    getAllReviewsByAlbumIdThunk,
} from "../services/review-thunk";
import {useParams} from "react-router";
import {getSingleListingByIdThunk, deleteListingThunk} from "../services/discogs-thunk";
import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";
import {addToShoppingCartThunk} from "../services/shopping-cart-thunk";
import AddToCartToast from "../components/add-to-cart-toast";
import AlreadyInCartToast from "../components/already-in-cart-toast";
import {createEmptyWishlistThunk, postToWishlistThunk} from "../services/wishlist-thunk"
import Toast from 'react-bootstrap/Toast';
import {Card, ListGroup, ToastContainer} from "react-bootstrap";

const DetailsScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const params = useParams();
    const albumId = !params.id ? undefined : params.id;
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query");
    const details = useSelector(state => state.discogs.details);
    const currentUser = useSelector(state => state.users.currentUser);
    const reviews = useSelector(state => state.reviews.reviews);
    const {shoppingCart} = useSelector(state => state.shoppingCart);
    const [quantity, setQuantity] = useState(!details ? 0 : details.record_quantity);
    const [addShow, setAddShow] = useState(false);
    const [negativeShow, setNegativeShow] = useState(false);
    const [newReview, setNewReview] = useState(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleAddWishList = () => {
        if(!currentUser) {
            return;
        }
        const wishlistData = {
            username: currentUser.username,
            album:{...details}
        }       
        dispatch(createEmptyWishlistThunk(wishlistData.username)).then((e) => {
            dispatch(postToWishlistThunk(wishlistData))
            handleShow()
        })
    }
    useEffect(() => {
        if(newReview) {
            // USED TO REDUCE UNNECESSARY DATABASE CALLBACK ON REFRESH
            setNewReview(false);
            dispatch(getSingleListingByIdThunk(albumId)).then(e => {
                setQuantity(e.payload.record_quantity)
            });
            dispatch(getAllReviewsByAlbumIdThunk(albumId));
        }
    },[])
    const addToCartButton = !currentUser || !details ? "d-none" : currentUser._id === details.record_vendor._id ? "d-none" : "position-absolute bottom-0 m-2 me-sm-3 bg-dark text-white end-0 btn btn-outline-dark";
    const addToWishlistButton = !currentUser || !details ? "d-none" : currentUser._id === details.record_vendor._id ? "d-none" : "btn border-1 bg-dark text-white border-dark";
    const inputStyle = !currentUser || !details ? "d-none" : currentUser._id === details.record_vendor._id ? "d-none" : "btn border-1 border-dark";
    const vendorListingButtonStyle = !currentUser || !details ? "d-none" : currentUser._id === details.record_vendor._id ? "btn bg-dark text-white" : "d-none";
    const totalStyle = !currentUser || !details ? "d-none" : currentUser._id !== details.record_vendor._id ? "text-dark" : "d-none";
    const cardStyle = !currentUser || !details ||  currentUser._id === details.record_vendor._id ? "ms-5 mb-2 me-sm-2" : "ms-5 mt-2 me-sm-2"
    return (
        <>
        {!details 
           ? <></>
            :
         <>
              <ToastContainer className="mt-5 me-5" position="top-end">
                <Toast onClose={() => setShow(false)} show={show}  delay={1500} autohide>
                    <Toast.Header>
                        <img
                            style={{width:"30px", height: "30px"}}
                            src={details.record_image}
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">Vintage Vinyl</strong>
                    </Toast.Header>
                    <Toast.Body>Successfully added to your cart!</Toast.Body>
                </Toast>
            </ToastContainer>
             <NavigationSidebar/>
             <AddToCartToast thumb={details.record_image} setShow={setAddShow} show={addShow}/>
             <AlreadyInCartToast thumb={details.record_image} setShow={setNegativeShow} show={negativeShow}/>
             <Card className="container mt-2 p-0">

                 <h1 className="m-2 mb-3 ms-5">Details</h1>
                 <img style={{height: "400px"}}
                      src="https://northgrandmall.com/wp-content/uploads/2021/05/Vintage-Vinyl.jpg"/>
                 <Card.Header>
                     <div className="flex-row d-flex justify-content-between align-items-center">
                         <h2 className="mt-1">{details.record_name}</h2>
                         <div className="p-2">
                             <button className={addToWishlistButton} onClick={() => handleAddWishList()}>Add to wishlist</button>
                         </div>
                         <button className={vendorListingButtonStyle} onClick={() => {
                             const params = {
                                 'id': details.discogs_id.toString(),
                                 "query": query
                             };
                             dispatch(deleteListingThunk(details._id));
                             navigation({
                                            pathname: "/search",
                                            search: `?${createSearchParams(params)}`
                                        });
                         }}>Delete Listing</button>
                     </div>
                 </Card.Header>
                 <div className="d-flex justify-content-between flex-row">
                <Card.Body className="position-relative ps-3 mt-2 d-flex flex-row justify-content-start p-2">
                    <div className="p-2 d-flex flex-column align-items-center justify-content-center">
                        <img style={{width:"150px", height:"150px"}} src={details.record_image}/>
                        {!currentUser ? <h5 className="mt-2">{"Log in to purchase this record!"}</h5> :
                         <>
                             <div className="mt-2 mb-2">
                                 <input style={{width:"105px"}} value={quantity} className={inputStyle} onChange={(e) =>
                                     setQuantity(e.target.value)} type="number" max={details.record_quantity} min={"1"}/>
                             </div>
                             <h5 className={totalStyle}>Total: ${details.record_price*quantity}</h5>

                         </>
                        }
                    </div>
                    <div >
                        <Card className={cardStyle}>
                            <ListGroup variant="flush">
                                <ListGroup.Item><h2>{"Artist: " +details.record_artist.replace("*","")}</h2></ListGroup.Item>
                                <ListGroup.Item>  <h4 className="text-dark">Price: ${details.record_price}</h4></ListGroup.Item>
                                <ListGroup.Item><h4 className="text-dark">Year recorded: {details.record_year}</h4></ListGroup.Item>
                                <ListGroup.Item className="d-none d-md-block"><h4 className="text-dark ">Genres: {details.record_genre}</h4></ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </div>
                    <div >
                    </div>
                <button style={{height: "fit-content", width: "fit-content"}} onClick={() => {
                    if (!shoppingCart.shopping_cart || shoppingCart.shopping_cart.some(e => e._id === details._id)){
                    setNegativeShow(true);
                        }else {
                            setAddShow(true);
                            dispatch(addToShoppingCartThunk(
                        {userId: currentUser._id, listing: {...details, scheduled_for_delete: quantity
                                                                                      === details.record_quantity}}))
                        }}
                } className={addToCartButton}>Add to cart
                </button>
             </Card.Body>
                 </div>
                 <Card className="p-0  d-flex justify-content-center">
                     <Card.Header>
                         <h3>Reviews</h3>
                     </Card.Header>
                     <div className="">
                                 <ReviewsByUser setNewReview={setNewReview} details={details} currentUser={currentUser}
                                            reviews={reviews}/>

                     </div>
                     <div className="col-3"></div>
                 </Card>
             </Card>


             {/*//     {"Reviews: "}*/}
             {/*//     {!reviews ? " ": reviews.map((e)=> {*/}
             {/*//         return e.user.username + " " + e.listing.record_name+ " "+e.body+"\n";*/}


         </>
        }
        </>

    );
}
export default DetailsScreen;



