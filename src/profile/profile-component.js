import React, {useEffect, useState} from "react";
import "./profile-style-sheet.css";
import {Link} from "react-router-dom";

import ModalWrapperButton from "../components/modal-wrapper-button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck} from "@fortawesome/free-solid-svg-icons";
import ReviewsByAlbum from "../reviews/reviews-by-album/reviews-by-album";
import FollowingButton from "../following/following-button";


const ProfileComponent = ({currentUser, profileUser}) => {


    const formatBirthDate = () => {
        const dateArr = profileUser.dob.split("-")
        const year = dateArr[0];
        const month = dateArr[1];
        const day = dateArr[2];
        const newDate = new Date(Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day)));
        const timeDiff = newDate.getTimezoneOffset() * 60000;
        const adjustedDate = new Date(newDate.valueOf() + timeDiff);
        const longMonth = adjustedDate.toLocaleString('default', { month: 'long' });
        return "Born " + longMonth + " " + adjustedDate.getUTCDate() + ", " + adjustedDate.getFullYear();
    };
    const formatJoined = () => {
        const joinDate = new Date(profileUser.dateJoined);
        const timeDiff = joinDate.getTimezoneOffset() * 60000;
        const adjustedDate = new Date(joinDate.valueOf() + timeDiff);
        const month = adjustedDate.toLocaleString('default', {month: 'long'});
        return "Joined " + month + " " + adjustedDate.getFullYear();
    }

    return (
        <>
            {!profileUser ?
                <>
                    <h3>Please log in</h3>
                </>
                :
                <div className="">
                    <div className="rounded-2 bg-white border">
                        <h1 className="wd-text-margins pt-2">Profile</h1>
                        {/*banner image*/}
                        <div className="p-2">
                            <img src={`${profileUser.bannerPic}`}
                                 className="w-100 wd-banner-format"/>
                        </div>
                        {/*edit profile button*/}
                        { currentUser && profileUser.username === currentUser.username &&
                            <Link to="/edit-profile" className="float-end me-2 wd-ep-button-format rounded-pill">
                                <button id="edit-profile-btn" className="btn text-white">Edit profile</button>
                            </Link>}
                        {/*avatar*/}
                        <div className="position-relative">
                            <img src={`${profileUser.profilePic}`}
                                 className="rounded-circle wd-profile-avatar-format position-absolute wd-profile-avatar-margins"/>
                            <FollowingButton currentUser={currentUser} profileUser={profileUser}/>

                        </div>
                        {/*profile info*/}
                        <div className="wd-text-margins">
                            <div className="wd-leave-extra-space-below-avatar">
                                <div className="row">
                                    <h5 className="fw-bold m-0">{profileUser.firstName} {profileUser.lastName}</h5>
                                    <div className="text-secondary">{profileUser.type === "BUYER" ? "Buyer" :
                                        <div>
                                            Seller
                                            <FontAwesomeIcon className="ms-1" icon={faCircleCheck} />
                                        </div>
                                    }</div>
                                </div>
                                <div className="text-black mt-2">{profileUser.bio}</div>
                                { currentUser && profileUser.username === currentUser.username &&
                                    <div className="row mt-2">
                                        <div>Email:</div>
                                        <div>{profileUser.email}</div>
                                    </div> }

                                <div className="row mt-2">
                                    <div className="d-inline-block text-secondary w-auto">
                                        <img src={require("../images/map-pin-vector.png")}
                                             className="wd-map-vector-icon-format my-auto"/>&nbsp;
                                        <span className="">{profileUser.location}</span>
                                    </div>
                                    { currentUser && profileUser.username === currentUser.username &&
                                        <div className="d-inline-block text-secondary w-auto">
                                            <img src={require("../images/birthday-cake.png")}
    className="wd-cake-icon-format my-auto"/>&nbsp;
                                            <span>{formatBirthDate()}</span>
                                        </div>}
                                    <div className="d-inline-block text-secondary w-auto">
                                        <img src={require("../images/calendar-outline.png")} className="my-auto wd-calendar-icon-format"/>&nbsp;
                                        <span>{formatJoined()}</span>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="d-inline-block text-secondary w-auto">
                                        <span>{profileUser.numOfReviews}</span>&nbsp;
                                        <span>Reviews</span>
                                    </div>
                                    <div className="d-inline-block text-secondary w-auto">
                                        <span>{profileUser.numOfWishlist}</span>&nbsp;
                                        <span>in Wish List</span>
                                    </div>
                                </div>
                                {
                                    currentUser && profileUser.username === currentUser.username && profileUser.type === "SELLER" &&
                                    <>
                                        <h2 className="mt-3">Click here to create a listing</h2>
                                        <div className="mt-2">
                                            <ModalWrapperButton/>
                                        </div>
                                    </>
                                }

                                <>
                                    <h1 className="mt-3">Reviews</h1>
                                    <div className="border border-2 border-secondary p-2 m-2">
                                        <ReviewsByAlbum key={profileUser._id} profileUser={profileUser}/>
                                    </div>
                                </>

                            </div>
                        </div>
                    </div>
                </div>}
        </>
    );
}
export default ProfileComponent;