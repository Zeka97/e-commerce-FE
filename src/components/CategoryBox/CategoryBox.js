import React, { useState } from "react";
import { Modal, Form, Input, notification, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { updateCategory } from "../../api";
import CustomButton from "../CustomButton/CustomButton";
import { useFilter } from "../../context/FilterContext";
import { useUser } from "../../context/UserContext";
import FileUpload from "../FileUpload/FileUpload";

const CategoryBox = (props) => {
  const navigate = useNavigate();
  const { setCategoryOnly } = useFilter();

  const [editCategoryModal, setEditCategoryModal] = useState(false);
  const [categoryPicture, setCategoryPicture] = useState(null);

  const { user, isLoading } = useUser();

  const [updateCategoryForm] = Form.useForm();

  const selectedCategory = (id) => {
    setCategoryOnly(id);
    navigate("/artikli");
  };

  const { mutate } = useMutation((params) => updateCategory(params));

  const editCategory = () => {
    updateCategoryForm.validateFields().then((values) => {
      mutate(
        { ...values, id: props.id, categoryPicture: categoryPicture },
        {
          onSuccess: (data) => {
            notification.success({
              message: "Edit Category",
              description: "Successfully edited Category",
            });
            setEditCategoryModal(false);
            updateCategoryForm.resetFields();
            props.refetch();
          },
          onError: (err) => {
            notification.error({
              message: "Edit Category",
              description: "There was an error with editing category",
            });
          },
        }
      );
    });
  };

  if (isLoading) {
    return <Spin />;
  }

  return (
    <>
      <div
        className="w-full h-[200px] flex border border-black rounded-[5px] px-8 bg-[#0e1514]"
        id={props.id}
        key={props.id}
      >
        <div className="flex flex-col items-center justify-center w-1/2">
          <h3 className="text-[22px] text-white">{props.naziv}</h3>
          {user && user.isAdmin === false ? (
            <button
              className="text-black w-[100px] rounded-[6px] bg-white px-4 py-2"
              onClick={() => selectedCategory(props.id)}
            >
              Pogledaj
            </button>
          ) : (
            <button
              className="text-black w-[100px] rounded-[6px] bg-white px-4 py-2"
              onClick={() => setEditCategoryModal(true)}
            >
              Uredi
            </button>
          )}
        </div>
        <div className="flex items-center justify-center w-1/2">
          <img
            src={
              props.photo?.startsWith("uploads")
                ? `${process.env.REACT_APP_BASE_URL}/${props?.photo}`
                : props?.photo
            }
            alt="slika"
            className="w-[200px] h-[150px] filter rounded-[100px] drop-shadow-[-10px_0px_30px_#4cd5e4]"
          />
        </div>
      </div>

      <Modal
        title="Edit Category"
        centered
        open={editCategoryModal}
        onCancel={() => setEditCategoryModal(false)}
        footer={
          <div className="flex flex-row justify-end">
            <CustomButton className="bg-red-300 mr-8 px-16 py-4">
              Delete
            </CustomButton>
            <CustomButton
              className="mr-8 px-16 py-4 border-[1px]"
              onClick={() => setEditCategoryModal(false)}
            >
              Cancel
            </CustomButton>
            <CustomButton
              className="bg-blue-400 px-16 py-4"
              onClick={editCategory}
            >
              Save
            </CustomButton>
          </div>
        }
        width={700}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
          form={updateCategoryForm}
          initialValues={{
            categoryName: props.naziv,
          }}
        >
          <Form.Item
            label="Naziv Kategorije"
            name="categoryName"
            rules={[{ required: true, message: "Polje ne smije biti prazno!" }]}
          >
            <Input name="categoryName" />
          </Form.Item>
          <Form.Item label="Slika Kategorije" name="categoryPicture">
            <FileUpload
              onFileChange={setCategoryPicture}
              initialImageUrl={props.photo}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default CategoryBox;
