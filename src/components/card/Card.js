import React from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";

import { useUser } from "../../context/UserContext";

const Card = ({ item, index, arrLen }) => {
  const navigate = useNavigate();

  const { user } = useUser();

  return (
    <div className="card grow" key={item.id}>
      <img
        src={
          item.photo.startsWith("uploads")
            ? `${process.env.REACT_APP_BASE_URL}/${item.photo}`
            : item.photo
        }
        alt={`slika proizvoda ${item.naziv}`}
      />
      <div className="opis">
        <div className="opis_header">
          <span className="naziv_proizvoda">
            {item.naziv.slice(0, 20) + "..."}
          </span>
          {item.akcijska_cijena ? (
            <div className="cijena">
              <span className="cijena_proizvoda line-throught">
                {item.cijena}$
              </span>
              <span className="cijena_proizvoda akcija">
                <b>{item.akcijska_cijena}$</b>
              </span>
            </div>
          ) : (
            <span className="cijena_proizvoda">
              <b>{item.cijena}$</b>
            </span>
          )}
        </div>
        <div className="opis_footer">
          <span
            className="kolicina_dugme"
            onClick={
              user?.isAdmin
                ? () => navigate(`/admin/articles/${item.id}`)
                : () => navigate(`/artikli/${item.id}`)
            }
          >
            +
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
