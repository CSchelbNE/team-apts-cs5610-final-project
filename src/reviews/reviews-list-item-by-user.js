import React from "react";
import "../index.css";

const ReviewsListItemByUser = ({review}) => {
    return(
        <>
            <li className="list-group-item">
                <div className="text-start">
                    <div className="row ">
                        <div className="ms-0 col-2">
                            <img src={review.user.profilePic}
                                 className="wd-profile-pic-format rounded-circle"/>
                        </div>
                        <div className="col-11 col-lg-10 col-md-10 col-sm-11">
                            <div className="float-end wd-nowrap">
                                {/*5 stars*/}
                                <img src={require(review.rating >= 1 ? "../images/gold-star-icon.png" : "../images/gray-star-icon.jpg")}
                                     className="wd-gold-star-format me-1" />
                                <img src={require(review.rating >= 2 ? "../images/gold-star-icon.png" : "../images/gray-star-icon.jpg")}
                                     className="wd-gold-star-format me-1" />
                                <img src={require(review.rating >= 3 ? "../images/gold-star-icon.png" : "../images/gray-star-icon.jpg")}
                                     className="wd-gold-star-format me-1" />
                                <img src={require(review.rating >= 4 ? "../images/gold-star-icon.png" : "../images/gray-star-icon.jpg")}
                                     className="wd-gold-star-format me-1" />
                                <img src={require(review.rating >= 5 ? "../images/gold-star-icon.png" : "../images/gray-star-icon.jpg")}
                                     className="wd-gold-star-format me-1" />
                            </div>
                            <div className="float-start mt-2">
                                <div>
                                    {review.body}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>

        </>
    );
}
export default ReviewsListItemByUser;