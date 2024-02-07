import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import { useDispatch, useSelector } from "react-redux";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import Header from "../../components/Header/header";
import { useMutation, useQuery } from "react-query";
import { Modal, Form, Input, Button, notification, message } from "antd";
import { updateUserProfile, userGetOrders } from "../../api";
import StatisticCard from "../../components/StatisticCard/StatisticCard";
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

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    isFetching,
    refetch,
    isFetched,
  } = useQuery("orders", () =>
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
          notification.success({
            message: "Edit profile",
            description: "U have sucessfully updated your profile",
          });
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
          notification.error({
            message: "Edit profile",
            description: "There was an error with updating profile",
          });
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
      <div className="flex items-center flex-col max-w-[1400px] mx-32 mt-32 gap-32">
        <div className="flex mx-5 mt-10 w-full justify-between">
          <div className="flex flex-col w-1/2 gap-16">
            <div className="flex items-center gap-4">
              <h3 className="font-bold text-[24px]">Profil</h3>
              <button
                className="px-[48px] py-[12px] bg-[#989898] text-white w-auto rounded-[5px]"
                onClick={() => setEditProfile(true)}
              >
                Uredi Profil
              </button>
              <button
                className="border-[1px] border-[#989898] px-[48px] py-[12px] text-[#989898] rounded-[5px]"
                onClick={() => setChangePassword(true)}
              >
                Change password
              </button>
            </div>
            <div className="flex">
              <div className="user_image">
                <img className="rounded-[10px]" src={user.slika} alt="slika" />
              </div>
              <div className="user_description">
                <h3 className="font-bold text-[32px]">
                  {user.ime + " " + user.prezime}{" "}
                </h3>
                <p>{user.grad}</p>
                <p>{user.email}</p>
                <p>{user.telefon}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-16">
            <h3 className="font-bold text-[24px]">Statistika</h3>
            <div className="flex gap-16">
              <StatisticCard
                header={"Spendings"}
                desc={user.potrosen_novac}
                isFetched={true}
              />
              <StatisticCard
                header={"Orders"}
                desc={total}
                isFetched={isFetched}
              />
            </div>
          </div>
        </div>
        <div className="w-full">
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
