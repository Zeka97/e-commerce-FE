import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import { useSelector } from "react-redux";
import Header from "../../components/Header/header";
import { useQuery } from "react-query";
import { userGetOrders } from "../../api";
import StatisticBox from "../../components/StatisticBox/StatisticBox";
import OrdersTable from "../../components/Table/OrdersTable/OrdersTable";
import { useSearchContext } from "../../components/context/SearchContext";

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const { searchOrdersDateFrom, searchOrdersDateTo } = useSearchContext();

  const [narudzbe, setNarudzbe] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsLimit, setRowsLimit] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const { data, isLoading, isSuccess, isError, isFetching, refetch } = useQuery(
    "orders",
    () =>
      userGetOrders({
        user_id: user.id,
        limit: rowsLimit,
        page,
        dateFrom: searchOrdersDateFrom,
        dateTo: searchOrdersDateTo,
      })
  );

  const { total, rows } = data || { total: 0, rows: [] };

  useEffect(() => {
    if (page == 1 && data) {
      setTotalItems(total);
    }
    refetch();
  }, [rows]);

  useEffect(() => {
    if (page == 1) {
      refetch();
    } else {
      setPage(1);
    }
  }, [searchOrdersDateTo]);

  useEffect(() => {
    refetch();
  }, [page, rowsLimit]);

  console.log(totalItems, rows);

  if (isLoading) return null;

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
          <div className="profile_statistic_description">
            <StatisticBox header={user.potrosen_novac} desc={"KM potroseno"} />
            <StatisticBox header={totalItems} desc={"izvresnih narudzbi"} />
          </div>
        </div>
      </div>
      <div className="narudzbe">
        <h3>Historija narudzbi</h3>
        <OrdersTable
          data={rows}
          isLoading={isLoading}
          isFetching={isFetching}
          total={totalItems}
          rowsLimit={rowsLimit}
          setRowsLimit={setRowsLimit}
          setPage={setPage}
          page={page}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
