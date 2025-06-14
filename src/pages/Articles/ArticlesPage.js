import React, { useEffect, useState } from "react";
import { Slider, Pagination } from "antd";

import Card from "../../components/card/Card";
import KategorijaSelect from "../../components/KategorijaSelect/KategorijaSelect";
import { useQuery } from "react-query";
import { getArticles } from "../../api";
import DiscountSelect from "../../components/DiscountSelect/DiscountSelect";
import PopularSelect from "../../components/PopularSelect/PopularSelect";
import CustomButton from "../../components/CustomButton/CustomButton";
import EditArticleModal from "../Article/components/EditArticleModal/EditArticleModal";
import { useFilter } from "../../context/FilterContext";
import { useUser } from "../../context/UserContext";

const ArticlesPage = () => {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(null);
  const [isOpenAddArticleModal, setIsOpenAddArticleModal] = useState(false);

  const { category, discount, popular, setCategory, setDiscount, setPopular } =
    useFilter();
  const { user } = useUser();

  const { data, error, isError, isSuccess, isFetching, isLoading, refetch } =
    useQuery(
      "articles",
      () =>
        getArticles({
          kategorija_id: category,
          discount: discount,
          popular: popular,
          priceRange,
          page,
          limit: 12,
        }),
      {
        retry: true,
      }
    );

  const { total, articles } = data || { total: null, articles: [] };

  useEffect(() => {
    if (page === 1) setTimeout(() => refetch(), 1000);
    else setPage(1);
  }, [category, popular, discount, priceRange]);

  useEffect(() => {
    if (page === 1) {
      setTotalItems(total);
    }
    refetch();
  }, [page, total]);

  const marks = {
    0: "0",
    25: "15",
    50: "50",
    75: "75",
    100: "100",
  };
  return (
    <>
      <div className="flex  flex-col pt-64 gap-24">
        <div className="flex gap-16">
          <div className="flex flex-col w-full">
            <label>Kategorija</label>
            <KategorijaSelect value={category} onChange={setCategory} />
          </div>
          <div className="flex flex-col w-full">
            <label>Akcija</label>
            <DiscountSelect value={discount} onChange={setDiscount} />
          </div>
          <div className="flex flex-col w-full">
            <label>Popular</label>
            <PopularSelect value={popular} onChange={setPopular} />
          </div>
          <div className="flex flex-col w-full">
            <label>Cijena</label>
            <div className="flex items-center h-full">
              <Slider
                defaultValue={[0, 100]}
                range
                style={{
                  width: "100%",
                  margin: 0,
                  display: "inline-block",
                }}
                marks={marks}
                onChange={(value) => setPriceRange(value)}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-16">
            {user.isAdmin && (
              <CustomButton
                type="black"
                onClick={() => setIsOpenAddArticleModal(true)}
              >
                Dodaj artikal
              </CustomButton>
            )}
          </div>
          <div className="flex justify-between">
            <h4>
              Broj pronadjenih artikala je: <b>{totalItems}</b>
            </h4>
            <Pagination
              defaultCurrent={1}
              total={totalItems}
              onChange={(page) => setPage(page)}
              pageSize={12}
            />
          </div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[10px] w-full pb-5">
          {isSuccess &&
            articles.map((item, index) => {
              return (
                <Card
                  item={item}
                  key={item.id}
                  index={index}
                  arrLen={articles.length}
                />
              );
            })}
        </div>
      </div>

      <EditArticleModal
        editArticleModal={isOpenAddArticleModal}
        setArticleModal={setIsOpenAddArticleModal}
        newArticle
      />
    </>
  );
};

export default ArticlesPage;
