import React, { useEffect, useState } from "react";
import "./narudzbe.css";

import axios from "../../components/Axios/axios";
import { useSelector } from "react-redux";
import Header from "../../components/Header/header";

const NarduzbePage = () => {
  const user = useSelector((state) => state.auth.currentUser);

  const [narudzbe, setNarudzbe] = useState(null);

  useEffect(() => {
    axios
      .get("/users/listanarudzbi", {
        params: {
          user: user.id,
        },
      })
      .then((result) => console.log(result));
  }, []);

  return (
    <div>
      <Header />
    </div>
  );
};

export default NarduzbePage;
