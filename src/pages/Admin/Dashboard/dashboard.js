import React, { useState, useEffect } from "react";
import AdminHeader from "../../../components/AdminHeader/AdminHeader";
import StatisticBox from "../../../components/StatisticBox/StatisticBox";
import { Table } from "antd";
import "./dashboard.css";
import { useQuery } from "react-query";
import { getAllTransactions } from "../../../api";
import OrdersTable from "../../../components/Table/OrdersTable/OrdersTable";
import { useSearchContext } from "../../../components/context/SearchContext";
import { orderColumns } from "./columns";
const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [rowsLimit, setRowsLimit] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const {
    searchOrdersDateFrom,
    searchOrdersDateTo,
    searchByCustomer,
    searchByCity,
    priceSort,
  } = useSearchContext();

  console.log(priceSort);

  const { data, isLoading, isFetching, refetch } = useQuery(
    "transactions",
    () =>
      getAllTransactions({
        limit: rowsLimit,
        page,
        dateFrom: searchOrdersDateFrom,
        dateTo: searchOrdersDateTo,
        customer: searchByCustomer,
        city: searchByCity,
        priceOrder: priceSort,
      })
  );

  const { total, rows } = data || { total: 0, rows: [] };

  console.log(rows);

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
  }, [searchOrdersDateTo, priceSort, searchByCustomer, searchByCity]);

  useEffect(() => {
    refetch();
  }, [page, rowsLimit]);

  console.log(data);
  return (
    <div>
      <AdminHeader />
      <div className="statistika">
        <h3>Statistika</h3>
        <div className="statistika-boxes">
          <StatisticBox header="Ukupna zarada" desc={0} />
          <StatisticBox header="Broj kupaca" desc={0} />
        </div>
      </div>
      <div className="transakcije">
        <h3>Transakcije</h3>
        <OrdersTable
          data={rows}
          columns={orderColumns}
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

export default Dashboard;
