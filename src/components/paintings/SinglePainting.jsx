import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const SinglePainting = (props) => {
  const [currentPainting, setCurrentPainting] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  let params = useParams();

  useEffect(() => {
    setCurrentPainting(
      props.products.filter((p) => p.id === params.paintingId)[0]
    );
  }, [props.products]);

  useEffect(() => {
    setIsLoaded(Object.keys(currentPainting).length !== 0);
  }, [currentPainting]);


  return (
    <div className="singlePainting--page">
      {isLoaded && (
        <div className="singlePainting--container">
          <h5>{currentPainting.name}</h5>

          <img
            className="singlePainting--img"
            src={currentPainting.image.url}
            alt=""
          />
          <div
            className="singlePainting--desc"
            dangerouslySetInnerHTML={{ __html: currentPainting.description }}
          />

          <h4 className="singlePainting--price">
            ${currentPainting.price.formatted}
          </h4>
          <div className="singlePainting--btns">
            <button
              className="add--to--cart"
              onClick={() => props.onAddCart(currentPainting.id)}
            >
              Add to cart
            </button>
            <Link to="/">
              <button className="singlePainting--back">Back to Shop</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePainting;
