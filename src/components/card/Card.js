import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Card.css";

import { addItemToCart } from "../../redux/actions/cart.action";

const Card = ({ item }) => {
  const [kolicina, setKolicina] = useState(1);

  const state = useSelector((state) => state.cart);
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
    <div className="card" key={item.artikal_id}>
      <img src={item.photo} alt={`slika proizvoda ${item.naziv}`} />
      <div className="opis">
        <div className="opis_header">
          <span>{item.naziv}</span>
          <span>{item.cijena * kolicina} KM</span>
        </div>
        <div className="opis_footer">
          <span onClick={() => smanjiKolicinu()}>-</span>
          <span>{kolicina}</span>
          <span onClick={() => povecajKolicinu()}>+</span>
        </div>
        <button onClick={() => dodajUKorpu({ ...item, kolicina: kolicina })}>
          Dodaj u korpu
        </button>
      </div>
    </div>
  );
};

export default Card;
