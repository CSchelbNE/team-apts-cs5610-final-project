import React from "react";
import checkCircleImg from "../images/check-circle.png";
import {useDispatch} from "react-redux";
import {deleteFollowerThunk} from "../services/following-thunk";

const FollowingListItem = ({followingItem, currentUser}) => {
    const dispatch = useDispatch();

    const formatJoined = () => {
        const joinDate = new Date(followingItem.followed_user.dateJoined);
        const timeDiff = joinDate.getTimezoneOffset() * 60000;
        const adjustedDate = new Date(joinDate.valueOf() + timeDiff);
        const month = adjustedDate.toLocaleString('default', {month: 'long'});
        return "Joined " + month + " " + adjustedDate.getFullYear();
    }

    return(

        <>
            <li className="list-group-item">
                <div className="d-flex justify-content-between">
                    <div  className="flex-inline my-auto">
                        <img src={`${followingItem.followed_user.profilePic}`} className="wd-profile-pic-format-follow rounded-circle"/>
                    </div>
                    <div className="flex-inline ms-1 my-auto">
                        <div className="fs-5 text-dark">
                            {followingItem.followed_user.firstName} {followingItem.followed_user.lastName}&nbsp;
                            <img src={checkCircleImg} className="wd-check-circle-icon-format-follow"/>&nbsp;
                            <span className="text-secondary">{followingItem.followed_user.type.toLowerCase()}</span>
                        </div>
                        {/*<div className="text-dark mt-1">{user.followed_user.bio}</div>*/}
                        <div className="text-secondary mt-1">
                            <img src={require("../images/calendar-outline.png")} className="my-auto wd-calendar-icon-format-follow"/>&nbsp;
                            <span>{formatJoined()}</span>
                        </div>
                        <div className="">
                            <div className="text-dark d-inline-block ">
                                <span>{followingItem.followed_user.numOfReviews}</span>&nbsp;
                                <span>Reviews</span>
                            </div>
                            {/*<div className="text-dark d-inline-block ms-3">*/}
                            {/*    <span>{user.followed_user.numOfWishlist}</span>&nbsp;*/}
                            {/*    <span>in Wish List</span>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                    <div className="my-auto ms-1">
                        <button className="btn btn-danger my-auto " onClick={() => {dispatch(deleteFollowerThunk(
                            followingItem._id
                        ))}}>Unfollow</button>
                    </div>
                </div>
            </li>
        </>

    );
}
export default FollowingListItem;