import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Card.css";

import { addItemToCart } from "../../redux/actions/cart.action";
import { startOfWeek } from "date-fns";

const Card = ({ item }) => {
  const [kolicina, setKolicina] = useState(1);

  const navigate = useNavigate();

  const state = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.currentUser);
  console.log(state);
  const dispatch = useDispatch();

  const smanjiKolicinu = () => {
    if (kolicina < 2) return null;
    else {
      setKolicina(kolicina - 1);
    }
  };

  const povecajKolicinu = () => {
    if (kolicina == item.kolicina) return null;
    else {
      setKolicina(kolicina + 1);
    }
  };

  const dodajUKorpu = (item) => {
    console.log("item:", item);
    dispatch(addItemToCart(item));
    setKolicina(1);
  };

  return (
    <div className="card" key={item.id}>
      <img src={item.photo} alt={`slika proizvoda ${item.naziv}`} />
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

        {user && (
          <div className="opis_footer">
            <span
              className="kolicina_dugme"
              onClick={
                user
                  ? () => navigate(`/artikli/${item.id}`)
                  : () => navigate(`/admin/articles/${item.id}`)
              }
            >
              +
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
