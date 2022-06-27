import React from "react";
import { useNavigate } from "react-router-dom";

const Painting = ({ data, onAddCart }) => {
  let navigate = useNavigate();
  const handleClick = (e) => {
    navigate(`/${e}`, { replace: true });
  };

  return (
    <div className="single--painting--container">
      <h5>{data.name}</h5>

      <img
        className="single--painting--img"
        src={data.image.url}
        alt=""
        onClick={() => handleClick(data.id)}
      />

      <h4 className="price">${data.price.formatted}</h4>
      <button className="add--to--cart" onClick={() => onAddCart(data.id)}>
        Add to cart
      </button>
    </div>
  );
};

export default Painting;
