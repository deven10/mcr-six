import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { cuisineData, restaurantsData } from "../data/RestuarantData";
import { ContextReview } from "../context/ReviewContext";

export const Homepage = () => {
  const navigate = useNavigate();
  const { allRestuarantsData } = useContext(ContextReview);
  const [showRestuarants, setShowRestuarants] = useState([]);

  const handleSelectedCuisine = (selectedCuisineId) => {
    const temp = allRestuarantsData?.filter(
      ({ cuisine_id }) => cuisine_id === selectedCuisineId
    );

    setShowRestuarants(temp);
  };

  return (
    <div className="homepage-wrapper">
      <h1>Food Ordering App</h1>
      <h3>Select your Cuisine:</h3>
      <div className="cuisine-wrapper">
        {cuisineData.map((cuisine) => (
          <p
            className="cuisine-type"
            onClick={() => handleSelectedCuisine(cuisine.id)}
            key={cuisine.id}
          >
            {cuisine.name}
          </p>
        ))}
      </div>

      <div className="selected-cuisine-wrapper">
        {showRestuarants.map((restuarant) => (
          <div key={restuarant.id} className="restuarant-wrapper">
            <p className="restuarant-wrapper-title">
              Dishes by {restuarant.name}
            </p>
            <div className="cards-wrapper">
              {restuarant.menu.map((menu, index) => (
                <div
                  key={index}
                  className="menu-card"
                  onClick={() => navigate(`/restuarant/${restuarant.id}`)}
                >
                  <img src={menu.imgSrc} alt={menu.name} />
                  <p className="menu-name">{menu.name}</p>
                  <p className="menu-price">
                    Rs. {menu.price} for {menu.qty}
                  </p>
                  <p className="menu-restuarant-name">{restuarant.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
