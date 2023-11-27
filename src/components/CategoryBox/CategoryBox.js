import React, { useState } from "react";
import { connect } from "react-redux";
import { Modal, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { categorySelectOnly } from "../../redux/actions/search.action";
import "./CategoryBox.css";
import { useMutation } from "react-query";
import { updateCategory } from "../../api";

const CategoryBox = (props) => {
  const navigate = useNavigate();

  const [editCategoryModal, setEditCategoryModal] = useState(false);

  const [updateCategoryForm] = Form.useForm();

  const selectedCategory = (id) => {
    props.select(id);
    navigate("/artikli");
  };

  const { mutate } = useMutation((params) => updateCategory(params));

  const editCategory = () => {
    updateCategoryForm.validateFields().then((values) => {
      mutate(
        { values, id: props.id },
        {
          onSuccess: (data) => {
            notification.success({
              message: "Edit Category",
              description: "Successfully edited Category",
            });
            setEditCategoryModal(false);
            updateCategoryForm.resetFields();
            setTimeout(() => window.location.reload(), 1000);
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

  return (
    <>
      <div className="CategoryBox" id={props.id}>
        <div className="CategoryBox_textcontent">
          <h3 className="text-[22px]">{props.naziv}</h3>
          {props.user ? (
            <button
              className="bg-white px-4 py-1"
              onClick={() => selectedCategory(props.id)}
            >
              Pogledaj
            </button>
          ) : (
            <button onClick={() => setEditCategoryModal(true)}>Uredi </button>
          )}
        </div>
        <div className="CategoryBox_img">
          <img src={props.photo} alt="slika" />
        </div>
      </div>

      <Modal
        title="Edit Category"
        centered
        open={editCategoryModal}
        onOk={editCategory}
        onCancel={() => setEditCategoryModal(false)}
        width={700}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
          form={updateCategoryForm}
        >
          <Form.Item
            label="Naziv Kategorije"
            name="categoryName"
            rules={[{ required: true, message: "Polje ne smije biti prazno!" }]}
            initialValue={props.naziv}
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
            initialValue={props.photo}
          >
            <Input name="categoryPicture" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    select: (category_id) => dispatch(categorySelectOnly(category_id)),
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.currentUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryBox);
