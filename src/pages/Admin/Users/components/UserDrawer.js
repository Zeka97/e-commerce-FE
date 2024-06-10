import React from "react";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import { useQuery, useMutation } from "react-query";
import { blockUser, getUserDetails } from "../../../../api";
import { notification, Drawer } from "antd";
import moment from "moment";

const UserDrawer = ({ userId, openDrawer, setOpenDrawer }) => {
  const { data, isError, isFetching, isLoading, refetch } = useQuery(
    ["getUserDetails", userId],
    () => getUserDetails(userId),
    { enabled: !!openDrawer }
  );

  console.log(data);
  const { mutate: blockUserMutate } = useMutation(blockUser, {
    onSuccess: () => {
      notification.success({
        message: "Block User",
        description: `U have successfuly ${
          data.blocked_forever ? " unblocked " : " blocked "
        } ${data.ime_i_prezime}`,
      });
      setOpenDrawer(false);
    },
    onError: (error) => {
      notification.error({
        message: "Block User",
        description: `There was an error while blocking a user ${data.ime_i_prezime}`,
      });
      console.log(error);
    },
  });

  return (
    <Drawer
      width={640}
      placement="right"
      closable={false}
      onClose={() => setOpenDrawer(false)}
      open={openDrawer}
    >
      <>
        <div className="user_box">
          <img src={data?.slika} alt="slika" width={150} height={150} />
          <div className="user_description">
            <h3>
              {data?.ime} {data?.prezime}
            </h3>
            <div>
              <span>{data?.grad}</span>
              <span>{data?.adresa}</span>
            </div>
            <p>{data?.email}</p>
            <p>{data?.telefon}</p>
            <div className="user_actions">
              <CustomButton
                className="black"
                width={50}
                height={50}
                onClick={() => blockUserMutate(data?.id)}
              >
                {data?.blocked_forever ? "Unblock" : "Block"}
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
            Total orders:
            <span style={{ marginLeft: "32px" }}>
              <b>{data?.ordersNumber}</b>
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
            Created at:
            <span style={{ marginLeft: "32px" }}>
              <b>{moment(data?.createdat).format("DD.MM.YYYY")}</b>
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
            Spendings:
            <span style={{ marginLeft: "32px" }}>
              <b>{data?.potrosen_novac} KM</b>
            </span>
          </span>
        </div>
        {data?.last_login && (
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
              Last seen:
              <span style={{ marginLeft: "32px" }}>
                <b>{moment(data?.last_login).format("DD.MM.YYYY hh:mm:ss")}</b>
              </span>
            </span>
          </div>
        )}
      </>
    </Drawer>
  );
};

export default UserDrawer;
