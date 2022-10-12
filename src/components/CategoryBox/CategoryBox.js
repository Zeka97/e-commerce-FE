import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categorySelectOnly } from "../../redux/actions/search.action";
import "./CategoryBox.css";

const CategoryBox = (props) => {
  const navigate = useNavigate();

  const selectedCategory = (id) => {
    console.log("asd");
    props.select(id);
    navigate("/");
  };

  return (
    <div className="CategoryBox" id={props.id}>
      <div className="CategoryBox_textcontent">
        <h3>{props.naziv}</h3>
        <button onClick={() => selectedCategory(props.id)}>Pogledaj</button>
      </div>
      <div className="CategoryBox_img">
        <img src={props.photo} alt="slika" />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    select: (category_id) => dispatch(categorySelectOnly(category_id)),
  };
};

export default connect(null, mapDispatchToProps)(CategoryBox);
