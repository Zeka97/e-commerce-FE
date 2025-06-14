import React, { useState } from "react";

import { Modal, Form, Input, notification } from "antd";

import { useMutation } from "react-query";

import { addNewCategory } from "../../api";
import FileUpload from "../FileUpload/FileUpload";

const AddCategoryBox = () => {
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [categoryPicture, setCategoryPicture] = useState(null);

  const [addCategoryForm] = Form.useForm();

  const { mutate } = useMutation((params) => addNewCategory(params));

  const handleAddCategory = () => {
    addCategoryForm
      .validateFields()
      .then((values) => {
        console.log(values);
        mutate(
          { ...values, categoryPicture },
          {
            onSuccess: (data) => {
              notification.success({
                message: "Add Category",
                description: "Successfully added Category",
              });
              setTimeout(() => window.location.reload(), 1000);
            },
            onError: (error) => {
              notification.error({
                message: "Add Category",
                description: "There was an error with adding Category",
              });
              console.log(error);
            },
          }
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div
        className="w-auto h-[200px] flex border-none flex-col justify-center items-center rounded-[5px] bg-[#efefef] hover:cursor-pointer"
        onClick={() => setAddCategoryModal(true)}
      >
        <div className="text-[20px] font-bold">+</div>
        <div>Dodaj Kategoriju</div>
      </div>

      <Modal
        title="addCategory"
        centered
        open={addCategoryModal}
        onOk={handleAddCategory}
        onCancel={() => setAddCategoryModal(false)}
        width={700}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
          form={addCategoryForm}
        >
          <Form.Item
            label="Naziv Kategorije"
            name="categoryName"
            rules={[{ required: true, message: "Polje ne smije biti prazno!" }]}
          >
            <Input name="categoryName" />
          </Form.Item>
          <Form.Item
            label="Slika Kategorije(link)"
            name="categoryPicture"
            getValueProps={(e) => console.log(e)}
          >
            <FileUpload onFileChange={setCategoryPicture} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddCategoryBox;
