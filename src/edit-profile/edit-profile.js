import React from "react";
import NavigationSidebar from "../navigation-sidebar/nav-bar";
import EditProfileComponent from "./edit-profile-component";

const EditProfileScreen = () => {
    return (
        <div className="row mt-3">
            <div className="col-3">
                <div className="w-100">
                    <NavigationSidebar/>
                </div>
            </div>
            <div className="col-9">
                <EditProfileComponent />
            </div>

        </div>
    );
}
export default EditProfileScreen;