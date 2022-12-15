import React, { useState } from "react";
import { connect } from "react-redux";
import { Modal, Form, Input, message } from "antd";
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
    console.log("asd");
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
            message.success("Uspjesno sacuvane izmjene", 2);
            setEditCategoryModal(false);
            updateCategoryForm.resetFields();
          },
          onError: (err) => {
            message.error("Greska pri izmjenama", 2);
          },
        }
      );
    });
  };

  return (
    <>
      <div className="CategoryBox" id={props.id}>
        <div className="CategoryBox_textcontent">
          <h3>{props.naziv}</h3>
          {props.user ? (
            <button onClick={() => selectedCategory(props.id)}>Pogledaj</button>
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
