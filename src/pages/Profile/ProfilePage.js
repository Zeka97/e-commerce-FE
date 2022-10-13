import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import { useSelector } from "react-redux";
import Header from "../../components/Header/header";
import { useQuery } from "react-query";
import { userGetOrders } from "../../api";

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.currentUser);

  const [narudzbe, setNarudzbe] = useState(null);

  const { data, isLoading, isSuccess, isError, isFetching } = useQuery(
    "orders",
    () => userGetOrders({ user_id: user.id })
  );

  console.log(data);
  return (
    <div className="profile_page">
      <Header />
      <div className="profile_view">
        <div className="profile_info">
          <div className="profile_edit">
            <h3>Profil</h3>
            <button>Uredi Profil</button>
          </div>
          <div className="profile_user_about">
            <div className="user_image">
              <img src={user.slika} alt="slika" />
            </div>
            <div className="user_description">
              <h3>{user.ime + " " + user.prezime} </h3>
              <p>{user.grad}</p>
              <p>{user.email}</p>
              <p>{user.telefon}</p>
            </div>
          </div>
        </div>
        <div className="profile_statistic">
          <h3>Statistika</h3>
          <div className="profile_statistic_description"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
