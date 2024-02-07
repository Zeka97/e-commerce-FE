import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { notification, Tag, Modal, Form, Input, Button } from "antd";
import {
  changeArticleVisibility,
  getArticle,
  removeDiscountPrice,
  setArticleOutOfStock,
  updateDiscountPrice,
} from "../../api";
import Header from "../../components/Header/header";

import "./ArticlePage.css";
import PopularArticles from "../../components/PopularArticles/PopularArticles";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../redux/actions/cart.action";
import CustomLinkButton from "../../components/customLinkButton/customLinkButton";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import CustomButton from "../../components/CustomButton/CustomButton";
import EditArticleModal from "./components/EditArticleModal/EditArticleModal";

const ArticlePage = () => {
  const { id } = useParams();

  const [kolicina, setKolicina] = useState(1);
  const [discountModal, setDiscountModal] = useState(false);
  const [editDiscount, setEditDiscount] = useState(null);
  const [isOpenEditArticleModal, setIsOpenEditArticleModal] = useState(false);

  const dispatch = useDispatch();

  const [discountForm] = Form.useForm();
  const user = useSelector((state) => state.auth.currentUser);

  const { mutate: articleVisibility } = useMutation((params) =>
    changeArticleVisibility(params)
  );

  const { mutate: setOutOfStock } = useMutation((params) =>
    setArticleOutOfStock(params)
  );

  const { mutate: mutateDiscountPrice } = useMutation((params) =>
    updateDiscountPrice(params)
  );

  const { mutate: mutateRemoveDiscountPrice } = useMutation((params) =>
    removeDiscountPrice(params)
  );

  const { data, isFetching, isLoading, isError, refetch } = useQuery(
    "singlearticle",
    () => getArticle({ id })
  );

  console.log(data);

  const dodajUKorpu = (item) => {
    console.log("item:", item);
    dispatch(addItemToCart(item));
    setKolicina(1);
  };

  const changeVisibility = () => {
    articleVisibility(
      { id: data.id, visibility: data.visibility },
      {
        onSuccess: (data) => {
          notification.success({
            message: "Article visibilty",
            description: `Article visibility successfully changed to ${
              data.visibility ? "hidden" : "visible"
            }`,
          });
          setTimeout(() => window.location.reload(), 2000);
        },
        onError: (err) => {
          notification.error({
            message: "Article visibilty",
            description: `There was an error with changing article visibility`,
          });
        },
      }
    );
  };

  const articleOutOfStock = () => {
    setOutOfStock(
      { id: data.id },
      {
        onSuccess: (data) => {
          notification.success({
            message: "Article Stock",
            description: `Article successfully changed to out of stock`,
          });
          setTimeout(() => window.location.reload(), 2000);
        },
        onError: (err) => {
          notification.error({
            message: "Article Stock",
            description: `There was an error`,
          });
          console.log(err);
        },
      }
    );
  };

  const handleDiscountPrice = () => {
    discountForm.validateFields().then((values) => {
      console.log(values);

      mutateDiscountPrice(
        { discount: values.discount, id: data.id },
        {
          onSuccess: (data) => {
            notification.success({
              message: "Article Discount",
              description: `U have been succesfully set article on discount`,
            });
            setDiscountModal(false);
            setTimeout(() => window.location.reload(), 2000);
          },
          onError: (err) => {
            notification.err({
              message: "Article Discount",
              description: `There was an error with changing discount price`,
            });
            console.log(err);
          },
        }
      );
    });
  };

  const handleRemoveDiscountPrice = () => {
    mutateRemoveDiscountPrice(
      { id: data.id },
      {
        onSuccess: (data) => {
          notification.success({
            message: "Article Discount",
            description: `U have  succesfully removed discount price`,
          });
          setDiscountModal(false);
          setTimeout(() => window.location.reload(), 2000);
        },
        onError: (err) => {
          notification.error({
            message: "Article Discount",
            description: `There was an error with changing discount price`,
          });
          console.log(err);
        },
      }
    );
  };

  const handleIncreaseQuantity = () => {
    setKolicina((prevState) => {
      console.log(prevState);
      return (prevState += 1);
    });
  };

  const handleDecreaseQuantity = () => {
    if (kolicina > 1)
      setKolicina((prevState) => {
        return (prevState -= 1);
      });
  };

  if (isLoading) return null;
  return (
    <>
      <div className="Article_page">
        <div className="Article_content">
          <div className="Article_image">
            <img src={data.photo} alt="slika" className="h-fit" />
          </div>
          <div className="Article_info">
            <div className="Article_info_header">
              <h3>{data.naziv}</h3>
            </div>
            <div className="Article_info_price">
              <span
                className={data.akcijska_cijena ? "price-linethrough" : "price"}
              >
                {data.cijena} KM/kom
              </span>
              {data.akcijska_cijena && (
                <span className="price">{data.akcijska_cijena} KM/kom</span>
              )}
            </div>
            <div className="Article_info_category_tag">
              <Tag color="green">{data.kategorija_naziv}</Tag>
              {user ? null : (
                <>
                  <Tag color="green">
                    {data.visibility
                      ? "Visible to customers"
                      : "Hidden from customers"}
                  </Tag>
                  <Tag color="green">Zalihe: {data.max_kolicina}</Tag>
                </>
              )}
            </div>

            {user ? (
              <div className="flex items-center gap-24 pb-64">
                <div className="flex gap-8 cursor-pointer">
                  <span
                    onClick={handleDecreaseQuantity}
                    className="decrease_quantity"
                  >
                    -
                  </span>
                  <span>{kolicina}</span>
                  <span
                    onClick={handleIncreaseQuantity}
                    className="increase_quantity"
                  >
                    +
                  </span>
                </div>
                <CustomLinkButton
                  onClick={() => dodajUKorpu({ ...data, kolicina })}
                  to="#"
                  className="dark !w-fit"
                >
                  DODAJ
                </CustomLinkButton>
              </div>
            ) : (
              <div className="admin_buttons">
                <CustomButton
                  className="black"
                  style={{ width: "200px", marginBottom: "10px" }}
                >
                  Obriši
                </CustomButton>
                <CustomButton
                  className="black"
                  style={{ width: "200px", marginBottom: "10px" }}
                  onClick={changeVisibility}
                >
                  Promjeni vidljivost
                </CustomButton>
                <CustomButton
                  className="black"
                  style={{ width: "200px", marginBottom: "10px" }}
                  onClick={articleOutOfStock}
                >
                  Nema na stanju
                </CustomButton>
                <CustomButton
                  className="black"
                  style={{ width: "200px", marginBottom: "10px" }}
                  onClick={() => setDiscountModal(true)}
                >
                  Akcija
                </CustomButton>
                <CustomButton
                  className="black"
                  style={{ width: "200px", marginBottom: "10px" }}
                  onClick={() => setIsOpenEditArticleModal(true)}
                >
                  Uredi
                </CustomButton>
              </div>
            )}
            <div className="Article_info_description">
              <h3>Opis</h3>
              <div>{data.description}</div>
            </div>
          </div>
        </div>
        {/*
      <div className="footer-popular-articles">
        <PopularArticles />
      </div>
              */}
      </div>

      <Modal
        title={`Regularna cijena proizvoda je ${data?.cijena || 0} KM`}
        centered
        footer={[
          <Button key="3" type="primary" onClick={handleRemoveDiscountPrice}>
            Remove discount
          </Button>,
          <Button
            key="2"
            onClick={() => {
              discountForm.resetFields();
              setDiscountModal(false);
            }}
          >
            Cancel
          </Button>,
          <Button key="1" type="primary" onClick={handleDiscountPrice}>
            Save
          </Button>,
        ]}
        onCancel={() => {
          discountForm.resetFields();
          setDiscountModal(false);
        }}
        open={discountModal}
        width={700}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          form={discountForm}
        >
          <Form.Item
            label="Akcijska cijena"
            name="discount"
            initialValue={data.akcijska_cijena}
            rules={[
              {
                required: true,
                message: "A value must be entered",
              },
              {
                message: "Value must be a positive number",
                pattern: new RegExp(/^\d+\.\d+$|^\d+$/),
              },
              {
                validator: async (rule, value) => {
                  if (value >= data.cijena)
                    return Promise.reject(
                      "Discount price must be lower then a regular price"
                    );
                },
              },
            ]}
          >
            <Input min={0.1} name="discount" />
          </Form.Item>
        </Form>
      </Modal>
      <EditArticleModal
        editArticleModal={isOpenEditArticleModal}
        setArticleModal={setIsOpenEditArticleModal}
        articleId={data.id}
        articleName={data.naziv}
        articlePrice={data.cijena}
        articleQuantity={data.max_kolicina}
        articleDescription={data.description}
        kategorijaId={data.kategorija_id}
      />
    </>
  );
};

export default ArticlePage;
