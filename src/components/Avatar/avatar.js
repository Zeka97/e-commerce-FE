import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { Popover, Avatar as AntAvatar } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

const Avatar = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const content = (
    <div className="w-[500px]">
      <div
        className="flex items-center gap-16 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
        onClick={() => navigate("/profile")}
      >
        <AntAvatar
          size={40}
          src="https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="
        />
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">
            {user?.ime} {user?.prezime}
          </span>
          <span className="text-sm text-gray-500">{user?.email}</span>
        </div>
      </div>
      <div className="border-t my-2"></div>
      <div
        className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer text-red-500"
        onClick={() => logout()}
      >
        <LogoutOutlined />
        <span>Logout</span>
      </div>
    </div>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      placement="bottomRight"
      arrow={{ pointAtCenter: true }}
    >
      <AntAvatar
        size={36}
        src="../User.png"
        icon={<UserOutlined />}
        className="hover:opacity-80 transition-opacity cursor-pointer"
      />
    </Popover>
  );
};

export default Avatar;
