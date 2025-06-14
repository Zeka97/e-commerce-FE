import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { notification, Tag, Modal, Form, Input, Button } from "antd";
import {
  changeArticleVisibility,
  deleteArticle,
  getArticle,
  removeDiscountPrice,
  setArticleOutOfStock,
  updateDiscountPrice,
} from "../../api";
import "./ArticlePage.css";
import CustomButton from "../../components/CustomButton/CustomButton";
import EditArticleModal from "./components/EditArticleModal/EditArticleModal";
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/UserContext";

const ArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [kolicina, setKolicina] = useState(1);
  const [discountModal, setDiscountModal] = useState(false);
  const [editDiscount, setEditDiscount] = useState(null);
  const [isOpenEditArticleModal, setIsOpenEditArticleModal] = useState(false);
  const [deleteArticleState, setDeleteArticleState] = useState(false);
  const [discountForm] = Form.useForm();
  const { user } = useUser();

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

  const { mutate: mutateRemoveArticle } = useMutation((id) =>
    deleteArticle(id)
  );

  const { data, isFetching, isLoading, isError, refetch } = useQuery(
    "singlearticle",
    () => getArticle({ id })
  );

  const { addToCart } = useCart();

  const dodajUKorpu = (item) => {
    addToCart(item);
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
          refetch();
        },
        onError: (err) => {
          notification.error({
            message: "Article Stock",
            description: `There was an error`,
          });
        },
      }
    );
  };

  const handleDiscountPrice = () => {
    discountForm.validateFields().then((values) => {
      mutateDiscountPrice(
        { discount: values.discount, id: data.id },
        {
          onSuccess: (data) => {
            notification.success({
              message: "Article Discount",
              description: `U have been succesfully set article on discount`,
            });
            setDiscountModal(false);
            refetch();
          },
          onError: (err) => {
            notification.err({
              message: "Article Discount",
              description: `There was an error with changing discount price`,
            });
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
          refetch();
        },
        onError: (err) => {
          notification.error({
            message: "Article Discount",
            description: `There was an error with changing discount price`,
          });
        },
      }
    );
  };

  const handleIncreaseQuantity = () => {
    setKolicina((prevState) => {
      return (prevState += 1);
    });
  };

  const handleDecreaseQuantity = () => {
    if (kolicina > 1)
      setKolicina((prevState) => {
        return (prevState -= 1);
      });
  };

  const handleDeleteArticle = (id) => {
    mutateRemoveArticle(id, {
      onSuccess: () => {
        notification.success({
          message: "Article Deleted",
          description: `U have  succesfully removed Article`,
        });
        setDeleteArticleState(false);
        setTimeout(() => navigate(-1), 2000);
      },
      onError: (err) => {
        notification.error({
          message: "Article Delete",
          description: `There was an error with deleting article`,
        });
      },
    });
  };

  if (isLoading) return null;
  return (
    <>
      <div className="flex pt-64">
        <div className="flex justify-center items-center">
          <img
            src={
              data.photo.startsWith("uploads")
                ? `${process.env.REACT_APP_BASE_URL}/${data.photo}`
                : data.photo
            }
            alt="slika"
            className="h-[600px]"
          />
        </div>
        <div className=" ml-24 w-1/2 flex flex-col gap-16 justify-center">
          <h3 className="font-bold text-2xl">{data.naziv}</h3>
          <span
            className={
              data.akcijska_cijena
                ? "line-through font-bold mr-5"
                : "text-2xl text-[#00da91] font-bold"
            }
          >
            {data.cijena} KM/kom
          </span>
          {data.akcijska_cijena && (
            <span className="text-2xl text-[#00da91] font-bold">
              {data.akcijska_cijena} KM/kom
            </span>
          )}
          <div>
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

          {user.isAdmin === false ? (
            <div className="flex items-center gap-32 pb-64">
              <div className="flex gap-16 cursor-pointer">
                <div
                  onClick={handleDecreaseQuantity}
                  className="flex items-center justify-center shadow w-[20px] h-[20px]"
                >
                  -
                </div>
                <div>{kolicina}</div>
                <div
                  onClick={handleIncreaseQuantity}
                  className="flex items-center justify-center shadow w-[20px] h-[20px]"
                >
                  +
                </div>
              </div>
              <CustomButton
                onClick={() => dodajUKorpu({ ...data, kolicina })}
                type="black"
              >
                DODAJ
              </CustomButton>
            </div>
          ) : (
            <div className="flex flex-col items-end gap-8">
              <CustomButton
                type="black"
                onClick={() => setDeleteArticleState(true)}
              >
                Obriši
              </CustomButton>
              <CustomButton type="black" onClick={changeVisibility}>
                Promjeni vidljivost
              </CustomButton>
              <CustomButton type="black" onClick={articleOutOfStock}>
                Nema na stanju
              </CustomButton>
              <CustomButton type="black" onClick={() => setDiscountModal(true)}>
                Akcija
              </CustomButton>
              <CustomButton
                type="black"
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

      <Modal
        title="Are you sure you want to delete this Article?"
        centered
        open={deleteArticleState}
        width={700}
        onCancel={() => setDeleteArticleState(false)}
        onOk={() => handleDeleteArticle(id)}
      />

      <Modal
        title={`Regularna cijena proizvoda je ${data?.cijena || 0} KM`}
        centered
        footer={[
          <Button
            key="3"
            type="primary"
            onClick={() => handleRemoveDiscountPrice()}
          >
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
          <Button key="1" type="primary" onClick={() => handleDiscountPrice()}>
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
        articlePhoto={data.photo}
      />
    </>
  );
};

export default ArticlePage;
