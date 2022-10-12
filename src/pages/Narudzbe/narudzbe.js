import React, { useEffect, useState } from "react";
import "./narudzbe.css";
import { useSelector } from "react-redux";
import Header from "../../components/Header/header";
import { useQuery } from "react-query";
import { userGetOrders } from "../../api";

const NarduzbePage = () => {
  const user = useSelector((state) => state.auth.currentUser);

  const [narudzbe, setNarudzbe] = useState(null);

  const { data, isLoading, isSuccess, isError, isFetching } = useQuery(
    "orders",
    () => userGetOrders({ user_id: user.id })
  );

  console.log(data);
  return (
    <div>
      <Header />
    </div>
  );
};

export default NarduzbePage;
