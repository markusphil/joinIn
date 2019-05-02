import React, { useRef } from "react";

import Modal from "../core/Modal";
import { Button } from "../buttons/ButtonMain";
import { changeUserInfoRequest } from "../../requests/changeUserInfo";

export const UserForm = props => {
  //using Hooks for Refs
  const profilePicRef = useRef(null);

  const confirmModalHandler = () => {
    const userInput = {
      profilePic: profilePicRef.current.value
    };

    if (userInput.profilePic.trim().length === 0) {
      props.context.updateMessage("error", "enter valid Data");
      return;
    }
    props.closeModal();

    changeUserInfoRequest(
      userInput.profilePic,
      props.context.token,
      props.context.checkExpiration
    )
      .then(resData => {
        props.context.changeUserInfo(resData.data.changeUserInfo.profilePic);
        props.context.updateMessage("success", "updated User Info");
      })
      .catch(err => {
        props.context.updateMessage("error", err.message);
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <Modal onCancel={props.closeModal}>
        <form className="login-form">
          <h1 className="form-title">Change User Info</h1>
          <div className="form-input">
            <label htmlFor="profile_pic">Profile Picture</label>
            <input type="profile_pic" id="profile_pic" ref={profilePicRef} />
          </div>
        </form>
        <div className="modal-actions">
          <Button
            status="primary"
            action={confirmModalHandler}
            type="create_event"
          >
            Update Profile
          </Button>
        </div>
      </Modal>
    </React.Fragment>
  );
};
