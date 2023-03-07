import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import { useDispatch, useSelector } from "react-redux";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import Header from "../../components/Header/header";
import { useMutation, useQuery } from "react-query";
import { Modal, Form, Input, Button, notification, message } from "antd";
import { updateUserProfile, userGetOrders } from "../../api";
import StatisticBox from "../../components/StatisticBox/StatisticBox";
import OrdersTable from "../../components/Table/OrdersTable/OrdersTable";
import { useSearchContext } from "../../components/context/SearchContext";
import { userLogin } from "../../redux/actions/user.action";
import ChangePasswordModal from "./components/ChangePasswordModal";

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const { searchOrdersDateFrom, searchOrdersDateTo } = useSearchContext();

  const [narudzbe, setNarudzbe] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsLimit, setRowsLimit] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [editProfile, setEditProfile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const [editProfileForm] = Form.useForm();

  const dispatch = useDispatch();

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

  const { mutate } = useMutation((params) => updateUserProfile(params));

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

  const updateProfile = (values) => {
    setEditProfile(false);
    mutate(
      { values, id: user.id },
      {
        onSuccess: (data) => {
          notification.success({message:'Edit profile', description:'U have sucessfully updated your profile'})
          localStorage.removeItem("user");
          dispatch(userLogin(data));
          localStorage.setItem(
            "user",
            JSON.stringify({
              admin: null,
              currentUser: data.user,
              isLogged: true,
            })
          );
        },
        onError: (err) => {
          notification.error({message:'Edit profile', description:'There was an error with updating profile'});
          console.log(err);
        },
      }
    );
  };

  const editProfileHandleOk = () => {
    editProfileForm
      .validateFields()
      .then((values) => {
        updateProfile(values);
        editProfileForm.resetFields();
      })
      .catch((err) => err);
  };

  if (isLoading) return null;

  return (
    <>
      <div className="profile_page">
        <Header />
        <div className="profile_view">
          <div className="profile_edit">
            <h3>Profil</h3>
            <button onClick={() => setEditProfile(true)}>Uredi Profil</button>
            <button onClick={() => setChangePassword(true)}>
              Change password
            </button>
          </div>
          <div className="profile_desc">
            <div className="profile_info">
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
                <StatisticBox
                  header={user.potrosen_novac}
                  desc={"KM potroseno"}
                />
                <StatisticBox header={totalItems} desc={"izvresnih narudzbi"} />
              </div>
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

      <Modal
        title="Edit profile"
        centered
        open={editProfile}
        onOk={editProfileHandleOk}
        onCancel={() => {
          editProfileForm.resetFields();
          setEditProfile(false);
        }}
        width={700}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          form={editProfileForm}
        >
          <Form.Item
            label="Ime"
            name="ime"
            rules={[
              { required: true, message: "Polje ime ne smije biti prazno!" },
            ]}
            initialValue={user.ime}
          >
            <Input type="text" name="ime" />
          </Form.Item>
          <Form.Item
            label="Prezime"
            name="prezime"
            rules={[
              {
                required: true,
                message: "Polje prezime ne smije biti prazno!",
              },
            ]}
            initialValue={user.prezime}
          >
            <Input type="text" name="prezime" />
          </Form.Item>
          <Form.Item
            label="Grad"
            name="grad"
            rules={[
              {
                required: true,
                message: "Polje grad ne smije biti prazno!",
              },
            ]}
            initialValue={user.grad}
          >
            <Input type="text" name="grad" />
          </Form.Item>
          <Form.Item
            label="Broj telefona"
            name="telefon"
            initialValue={user.telefon}
          >
            <Input type="text" name="telefon" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password to confirm changes..." />
          </Form.Item>
        </Form>
      </Modal>

      <ChangePasswordModal
        changePassword={changePassword}
        setChangePassword={setChangePassword}
        userId={user.id}
      />
    </>
  );
};

export default ProfilePage;
