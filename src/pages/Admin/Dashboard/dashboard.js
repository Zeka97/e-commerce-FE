import React, { useState, useEffect } from "react";
import AdminHeader from "../../../components/AdminHeader/AdminHeader";
import StatisticCard from "../../../components/StatisticCard/StatisticCard";
import { Spin, Table } from "antd";
import "./dashboard.css";
import { useQuery } from "react-query";
import { getAllTransactions, getStatistic } from "../../../api";
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

  const { data, isLoading, isFetching, isFetched, refetch } = useQuery(
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

  const { data: statistic } = useQuery("statistic", getStatistic);

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
  }, [
    searchOrdersDateTo,
    priceSort,
    searchByCustomer,
    searchByCity,
    searchOrdersDateFrom,
    page,
    refetch,
  ]);

  useEffect(() => {
    refetch();
  }, [page, rowsLimit, refetch]);

  if (isLoading || isFetching) return <Spin />;

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[1400px] w-[1400px] flex flex-col items-center mx-32">
        <div className="statistika w-full">
          <h3 className="text-xl font-bold">Statistika</h3>
          <div className="flex gap-16">
            <StatisticCard
              header="Earnings"
              desc={statistic?.totalEarnings}
              isFetched={isFetched}
              statisticChange={statistic?.lastMonthEarningsPercentage}
            />
            <StatisticCard
              header="Users"
              desc={statistic?.numberOfUsers}
              isFetched={isFetched}
              statisticChange={statistic?.lastMonthNewUsersPercentage}
            />
            <StatisticCard
              header="Transactions"
              desc={statistic?.numberOfTransactions}
              isFetched={isFetched}
              statisticChange={
                statistic?.lastMonthNumberOfTransactionsPercentage
              }
            />
          </div>
        </div>
        <div className="transakcije w-full">
          <h3 className="text-xl font-bold">Transakcije</h3>
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
    </div>
  );
};

export default Dashboard;
