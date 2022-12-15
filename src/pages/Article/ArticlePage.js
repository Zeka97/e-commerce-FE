import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { message, Tag } from "antd";
import {
  changeArticleVisibility,
  getArticle,
  setArticleOutOfStock,
} from "../../api";
import Header from "../../components/Header/header";

import "./ArticlePage.css";
import PopularArticles from "../../components/PopularArticles/PopularArticles";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../redux/actions/cart.action";
import CustomLinkButton from "../../components/customLinkButton/customLinkButton";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import CustomButton from "../../components/CustomButton/CustomButton";
import { es } from "date-fns/locale";

const ArticlePage = () => {
  const { id } = useParams();

  const [kolicina, setKolicina] = useState(1);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.currentUser);

  const { mutate: articleVisibility } = useMutation((params) =>
    changeArticleVisibility(params)
  );

  const { mutate: setOutOfStock } = useMutation((params) =>
    setArticleOutOfStock(params)
  );

  const { data, isFetching, isLoading, isError, refetch } = useQuery(
    "singlearticle",
    () => getArticle({ id })
  );
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
          message.success("uspjesno izvrsene promjene", 2);
          setTimeout(() => window.location.reload(), 2000);
        },
        onError: (err) => {
          console.log("nije uspjelo", err);
        },
      }
    );
  };

  const articleOutOfStock = () => {
    setOutOfStock(
      { id: data.id },
      {
        onSuccess: (data) => {
          message.success("uspjesno izvrsene promjene", 2);
          setTimeout(() => window.location.reload(), 2000);
        },
        onError: (err) => {
          message.error("greska pri izmjenama");
          console.log(err);
        },
      }
    );
  };

  if (isLoading) return null;
  return (
    <div className="Article_page">
      {user ? <Header /> : <AdminHeader />}
      <div className="Article_content">
        <div className="Article_image">
          <img src={data.photo} alt="slika" />
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
            <div className="Article_info_cartadding">
              <span>QTY</span>
              <span>Cijena</span>
              <span></span>
              <div>
                <span>-</span>
                <span>{kolicina}</span>
                <span>+</span>
              </div>
              <span>
                {data.akcijska_cijena
                  ? kolicina * data.akcijska_cijena
                  : kolicina * data.cijena}
                {" KM"}
              </span>
              <CustomLinkButton
                onClick={() => dodajUKorpu({ ...data, kolicina })}
                to="#"
                className={"dark"}
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
              >
                Akcija
              </CustomButton>
              <CustomButton
                className="black"
                style={{ width: "200px", marginBottom: "10px" }}
              >
                Uredi
              </CustomButton>
            </div>
          )}
          <div className="Article_info_description">
            <h3>Opis</h3>
            <div>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
              est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
              velit, sed quia non numquam eius modi tempora incidunt ut labore
              et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
              veniam, quis nostrum exercitationem ullam corporis suscipit
              laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
              vel eum iure reprehenderit qui in ea voluptate velit esse quam
              nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
              voluptas nulla pariatur?
            </div>
          </div>
        </div>
      </div>
      {/*
      <div className="footer-popular-articles">
        <PopularArticles />
      </div>
              */}
    </div>
  );
};

export default ArticlePage;
