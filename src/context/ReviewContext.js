import React, { createContext, useState } from "react";
import { restaurantsData } from "../data/RestuarantData";
export const ContextReview = createContext();

export const ReviewContext = ({ children }) => {
  const [selectedRating, setSelectedRating] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [reviewerComment, setReviewerComment] = useState("");

  const [allRestuarantsData, setAllRestuarantsData] = useState(restaurantsData);

  const imgUrl = "https://i.ibb.co/BrSM4RV/download-1.jpg";

  const handleClear = () => {
    setSelectedRating("");
    setReviewerName("");
    setReviewerComment("");
  };

  const handleReview = (restuarantId) => {
    if (
      selectedRating === "" ||
      reviewerName === "" ||
      reviewerComment === ""
    ) {
      alert("Please fill all the details");
    } else {
      const newRating = {
        rating: selectedRating,
        revName: reviewerName,
        comment: reviewerComment,
        pp: imgUrl,
      };

      const newData = allRestuarantsData.map((data) =>
        data.id === Number(restuarantId)
          ? { ...data, ratings: [...data.ratings, newRating] }
          : data
      );

      setAllRestuarantsData(newData);
      handleClear();
    }
  };

  return (
    <ContextReview.Provider
      value={{
        selectedRating,
        reviewerName,
        reviewerComment,
        setSelectedRating,
        setReviewerName,
        setReviewerComment,
        handleReview,
        allRestuarantsData,
      }}
    >
      {children}
    </ContextReview.Provider>
  );
};
