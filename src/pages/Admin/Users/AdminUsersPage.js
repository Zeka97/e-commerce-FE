import { Table, Drawer, message, notification } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { useMutation, useQuery } from "react-query";
import { blockUser, getAllUsers } from "../../../api";

import AdminHeader from "../../../components/AdminHeader/AdminHeader";
import CustomButton from "../../../components/CustomButton/CustomButton";

import "./AdminUsersPage.css";
import { usersColumns } from "./components/columns";

const AdminUsersPage = () => {
  const [page, setPage] = useState(1);
  const [rowsLimit, setRowsLimit] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const { data, isError, isLoading, isFetching, refetch } = useQuery(
    "getAllUsers",
    () => getAllUsers({ page, limit: rowsLimit })
  );

  const { mutate: blockUserMutate } = useMutation(blockUser, {
    onSuccess: () => {
      notification.success({
        message: "Block User",
        description: `U have successfuly ${
          userDetails.blocked_forever ? " unblocked " : " blocked "
        } ${userDetails.ime_i_prezime}`,
      });
      setOpenDrawer(false);
      refetch();
    },
    onError: (error) => {
      notification.error({
        message: "Block User",
        description: `There was an error while blocking a user ${userDetails.ime_i_prezime}`,
      });
      console.log(error);
    },
  });

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

  console.log(userDetails);
  return (
    <>
      <div className="UsersPage">
        <AdminHeader />
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
                  setUserDetails(r);
                  setOpenDrawer(true);
                  console.log(userDetails);
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

      <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        <>
          <div className="user_box">
            <img
              src={userDetails?.slika}
              alt="slika"
              width={150}
              height={150}
            />
            <div className="user_description">
              <h3>{userDetails?.ime_i_prezime}</h3>
              <div>
                <span>{userDetails?.grad}</span>
                <span>{userDetails?.adresa}</span>
              </div>
              <p>{userDetails?.email}</p>
              <p>{userDetails?.telefon}</p>
              <div className="user_actions">
                <CustomButton
                  className="black"
                  width={50}
                  height={50}
                  onClick={() => blockUserMutate(userDetails?.id)}
                >
                  {userDetails?.blocked_forever ? "Unblock" : "Block"}
                </CustomButton>
                <CustomButton className="black">Delete</CustomButton>
              </div>
            </div>
          </div>
          <div
            style={{
              height: "60px",
              width: "100%",
              border: "1px solid #f4f4f4",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            <span>
              Zadnjih mjesec dana:{" "}
              <span style={{ marginLeft: "32px" }}>
                <b>100KM</b>
              </span>
            </span>
          </div>
          <div
            style={{
              height: "60px",
              width: "100%",
              border: "1px solid #f4f4f4",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            <span>
              Zadnjih mjesec dana:{" "}
              <span style={{ marginLeft: "32px" }}>
                <b>100KM</b>
              </span>
            </span>
          </div>
          <div
            style={{
              height: "60px",
              width: "100%",
              border: "1px solid #f4f4f4",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            <span>
              Zadnjih mjesec dana:{" "}
              <span style={{ marginLeft: "32px" }}>
                <b>100KM</b>
              </span>
            </span>
          </div>
        </>
      </Drawer>
    </>
  );
};

export default AdminUsersPage;
