import React, { useState } from "react";

import { Modal, Form, Input, message } from "antd";

import { useMutation } from "react-query";

import "./AddCategoryBox.css";
import { addNewCategory } from "../../api";

const AddCategoryBox = () => {
  const [addCategoryModal, setAddCategoryModal] = useState(false);

  const [addCategoryForm] = Form.useForm();

  const { mutate } = useMutation((params) => addNewCategory(params));

  const handleAddCategory = () => {
    addCategoryForm
      .validateFields()
      .then((values) => {
        console.log(values);
        mutate(values, {
          onSuccess: (data) => {
            message.success("Uspjesno dodana kategorija", 2);
            setTimeout(() => window.location.reload(), 1000);
          },
          onError: (error) => {
            message.error("Greska pri dodavanju kategorije");
            console.log(error);
          },
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="addCategoryBox" onClick={() => setAddCategoryModal(true)}>
        <div className="plus">+</div>
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
            rules={[
              {
                required: true,
                message: "Polje ne smije biti prazno!",
              },
            ]}
          >
            <Input name="categoryPicture" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddCategoryBox;
