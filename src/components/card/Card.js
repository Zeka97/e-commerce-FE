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
          <span
            className="naziv_proizvoda"
            onClick={
              user
                ? () => navigate(`/artikli/${item.id}`)
                : () => navigate(`/admin/articles/${item.id}`)
            }
          >
            {item.naziv.slice(0, 17) + "..."}
          </span>
          {item.akcijska_cijena ? (
            <div className="cijena">
              <span className="cijena_proizvoda line-throught">
                {item.cijena} KM
              </span>
              <span className="cijena_proizvoda akcija">
                {item.akcijska_cijena} KM
              </span>
            </div>
          ) : (
            <span className="cijena_proizvoda">{item.cijena} KM</span>
          )}
        </div>

        {user && (
          <div className="opis_footer">
            <span className="kolicina_dugme" onClick={() => smanjiKolicinu()}>
              -
            </span>
            <span className="kolicina">{kolicina}</span>
            <span className="kolicina_dugme" onClick={() => povecajKolicinu()}>
              +
            </span>
          </div>
        )}
      </div>

      {user && (
        <button
          onClick={() => dodajUKorpu({ ...item, kolicina: kolicina })}
          className="card-button"
        >
          Dodaj u korpu
        </button>
      )}
    </div>
  );
};

export default Card;
