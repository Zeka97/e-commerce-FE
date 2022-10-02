import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import "./avatar.css";

const Avatar = () => {
  const navigate = useNavigate();
  const openDropdown = () => {
    let k = document.getElementById("dropdown");
    k.classList.toggle("active");
  };
  const user = useSelector((state) => state.auth.currentUser);
  console.log(user);

  const Logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="user-menu-wrap">
      <img
        className="mini-photo"
        src="https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="
        width="36"
        height="36"
        onClick={() => openDropdown()}
      />

      <div className="menu-container" id="dropdown">
        <ul className="user-menu">
          <div className="profile-highlight">
            <img
              src="https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="
              alt="profile-img"
              width="36"
              height="36"
            />
            <div className="details">
              <div id="profile-name">{user.ime + " " + user.prezime}</div>
              <div id="profile-footer">{user.email}</div>
            </div>
          </div>
          <li className="user-menu__item">
            <a className="user-menu-link" onClick={() => navigate("/")}>
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1604623/team.png"
                alt="trophy_icon"
                width="20"
                height="20"
              />
              <div>Edit Profile</div>
            </a>
          </li>
          <li className="user-menu__item">
            <a className="user-menu-link" onClick={() => navigate("/narudzbe")}>
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1604623/book.png"
                alt="team_icon"
                width="20"
                height="20"
              />
              <div>Narudzbe History</div>
            </a>
          </li>
          <div className="footer">
            <li className="user-menu__item">
              <a className="user-menu-link" onClick={() => Logout()}>
                Logout
              </a>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Avatar;
