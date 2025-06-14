import React, { useEffect, useState } from "react";
import { Modal, Form, Input, notification, Select, message } from "antd";
import { useMutation, useQuery } from "react-query";

import "./EditArticleModal.css";
import { addArticle, editArticle, getAllCategories } from "../../../../api";
import { useNavigate } from "react-router-dom";
import FileUpload from "../../../../components/FileUpload/FileUpload";

const EditArticleModal = (props) => {
  const { Option } = Select;
  const [articlePhoto, setArticlePhoto] = useState(null);

  const [editArticleForm] = Form.useForm();
  const [addArticleForm] = Form.useForm();

  const { mutate: mutateEditArticle } = useMutation((params) =>
    editArticle(params)
  );

  const { mutate: mutateAddArticle } = useMutation((params) =>
    addArticle(params)
  );

  const {
    data,
    isSuccess,
    isFetching,
    isLoading,
    isError,
    isFetched,
    refetch,
  } = useQuery("Categories", getAllCategories);

  useEffect(() => {
    if (isFetched) {
      editArticleForm.setFieldsValue({
        articleCategory: props.kategorijaId || "",
        articleName: props.articleName || "",
        articlePrice: props.articlePrice || "",
        articleQuantity: props.articleQuantity || "",
        articleDescription: props.articleDescription || "",
      });
    }
  }, [isFetched]);

  const handleEditArticle = () => {
    editArticleForm.validateFields().then(async (values) => {
      try {
        const data = {
          ...values,
          articlePhoto,
        };

        mutateEditArticle(
          {
            id: props.articleId,
            ...data,
          },
          {
            onSuccess: (data) => {
              notification.success({
                message: "Edit Article",
                description: "Successfully edited article",
              });
              props.setArticleModal(false);
              setTimeout(() => window.location.reload(), 2000);
            },
            onError: (error) => {
              console.log(error);
              notification.error({
                message: "Edit Article",
                description: "Error while editing article",
              });
            },
          }
        );
      } catch (error) {
        console.error("Error:", error);
        notification.error({
          message: "Error",
          description: "Error processing the image",
        });
      }
    });
  };

  const handleAddArticle = () => {
    addArticleForm.validateFields().then(async (values) => {
      if (!articlePhoto) {
        message.error("Please upload an article photo");
        return;
      }

      try {
        const data = {
          ...values,
          articlePhoto,
        };

        mutateAddArticle(data, {
          onSuccess: (data) => {
            notification.success({
              message: "Add Article",
              description: "Successfully added new article",
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
      } catch (error) {
        console.error("Error:", error);
        notification.error({
          message: "Error",
          description: "Error processing the image",
        });
      }
    });
  };

  return (
    <Modal
      title="Edit article"
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
        >
          <Input name="articleName" />
        </Form.Item>
        <Form.Item
          label="Photo"
          name="articlePhoto"
          rules={[
            {
              required: true,
              message: "Article photo is required",
            },
          ]}
          getValueProps={(e) => console.log(e)}
        >
          <FileUpload
            initialImageUrl={props.articlePhoto}
            onFileChange={setArticlePhoto}
          />
        </Form.Item>

        <Form.Item
          label="Price"
          name="articlePrice"
          rules={[
            {
              required: true,
              message: "Price is required",
            },
          ]}
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
        >
          <Input min={1} name="articleQuantity" />
        </Form.Item>
        <Form.Item label="Description" name="articleDescription">
          <Input.TextArea
            rows={4}
            placeholder="Max length 255 characters..."
            maxLength={1200}
          />
        </Form.Item>
        <Form.Item label="Category" name="articleCategory">
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
