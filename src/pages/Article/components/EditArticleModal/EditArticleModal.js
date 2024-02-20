import React from "react";
import { Modal, Form, Input, notification, Select } from "antd";
import { useMutation, useQuery } from "react-query";

import "./EditArticleModal.css";
import { addArticle, editArticle, getAllCategories } from "../../../../api";
import { useNavigate } from "react-router-dom";

const EditArticleModal = (props) => {
  const { Option } = Select;

  const [editArticleForm] = Form.useForm();
  const [addArticleForm] = Form.useForm();

  console.log(props);

  const { mutate: mutateEditArticle } = useMutation((params) =>
    editArticle(params)
  );

  const { mutate: mutateAddArticle } = useMutation((params) =>
    addArticle(params)
  );

  const { data, isSuccess, isFetching, isLoading, isError, refetch } = useQuery(
    "Categories",
    getAllCategories
  );

  const handleEditArticle = () => {
    editArticleForm.validateFields().then((values) => {
      console.log(values);

      mutateEditArticle(
        {
          id: props.articleId,
          values,
        },
        {
          onSuccess: (data) => {
            notification.success({
              message: "Edit Article",
              description: "Succesfully edited article",
            });
            props.setArticleModal(false);
            setTimeout(() => window.location.reload(), 2000);
          },
          onError: (error) => {
            console.log(error);
            notification.error({
              message: "Edit Article",
              description: "Succesfully edited article",
            });
          },
        }
      );
    });
  };

  const handleAddArticle = () => {
    addArticleForm.validateFields().then((values) => {
      console.log(values);
      mutateAddArticle(values, {
        onSuccess: (data) => {
          notification.success({
            message: "Add Article",
            description: "Succesfully added new article",
          });
          props.setArticleModal(false);
          setTimeout(() => window.location.reload(), 2000);
        },
        onError: (error) => {
          console.log(error);
          notification.error({
            message: "Add Article",
            description: "Error while adding article",
          });
        },
      });
    });
  };

  return (
    <Modal
      title={`Edit article`}
      centered
      open={props.editArticleModal}
      onOk={props.newArticle ? handleAddArticle : handleEditArticle}
      onCancel={() => {
        editArticleForm.resetFields();
        props.setArticleModal(false);
      }}
      width={700}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        form={props.newArticle ? addArticleForm : editArticleForm}
      >
        <Form.Item
          label="Name"
          name="articleName"
          rules={[
            {
              required: true,
              message: "Article name is required",
            },
          ]}
          initialValue={props.articleName || ""}
        >
          <Input name="articleName" />
        </Form.Item>
        {props.newArticle && (
          <Form.Item
            label="Photo"
            name="articlePhoto"
            rules={[
              {
                required: true,
                message: "Article photo is required",
              },
            ]}
          >
            <Input name="articleName" />
          </Form.Item>
        )}

        <Form.Item
          label="Price"
          name="articlePrice"
          rules={[
            {
              required: true,
              message: "Price is required",
            },
          ]}
          initialValue={props.articlePrice || ""}
        >
          <Input min={0.1} name="articlePrice" />
        </Form.Item>
        <Form.Item
          label="Quantity"
          name="articleQuantity"
          rules={[
            {
              required: true,
              message: "Quantity is required",
            },
          ]}
          initialValue={props.articleQuantity || ""}
        >
          <Input min={1} name="articleQuantity" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="articleDescription"
          initialValue={props.articleDescription || ""}
        >
          <Input.TextArea
            rows={4}
            placeholder="Max length 255 characters..."
            maxLength={1200}
          />
        </Form.Item>
        <Form.Item
          label="Category"
          name="articleCategory"
          initialValue={props.kategorijaId || ""}
        >
          <Select>
            {isSuccess &&
              data.map((item) => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.naziv}
                  </Option>
                );
              })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditArticleModal;
