import { Table, Drawer, message, notification } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import moment from "moment";

import { useMutation, useQuery } from "react-query";
import { blockUser, getAllUsers } from "../../../api";

import AdminHeader from "../../../components/AdminHeader/AdminHeader";
import CustomButton from "../../../components/CustomButton/CustomButton";

import "./AdminUsersPage.css";
import { usersColumns } from "./components/columns";
import UserDrawer from "./components/UserDrawer";

const AdminUsersPage = () => {
  const [page, setPage] = useState(1);
  const [rowsLimit, setRowsLimit] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [userId, setUserId] = useState(null);

  const { data, isError, isLoading, isFetching, refetch } = useQuery(
    "getAllUsers",
    () => getAllUsers({ page, limit: rowsLimit })
  );

  const { rows, total } = data || { rows: [], total: 0 };

  useEffect(() => {
    if (page == 1 && total) {
      setTotalItems(total);
    }
    refetch();
  }, [page, total]);

  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
  }, [rowsLimit]);
  return (
    <>
      <div className="UsersPage">
        <div className="main-content">
          <h3>Pregled kupaca</h3>
          <div className="users">
            <Table
              dataSource={rows}
              columns={usersColumns}
              isLoading={isLoading || isFetching}
              rowKey="id"
              onRow={(r) => ({
                onClick: () => {
                  setUserId(r.id);
                  setOpenDrawer(true);
                },
              })}
              pagination={{
                current: page,
                pageSize: rowsLimit,
                total: totalItems,
                onChange: (page) => setPage(page),
                pageSizeOptions: ["10", "20", "50"],
                showSizeChanger: true,
                onShowSizeChange: (current, size) => setRowsLimit(size),
                showTotal: () =>
                  `${(page - 1) * rowsLimit + 1} -  ${
                    totalItems > page * rowsLimit
                      ? page * rowsLimit
                      : totalItems
                  } od ukupno ${totalItems}`,
              }}
            />
          </div>
        </div>
      </div>

      <UserDrawer
        userId={userId}
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
    </>
  );
};

export default AdminUsersPage;
