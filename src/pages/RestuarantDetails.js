import React, { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { restaurantsData } from "../data/RestuarantData";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ContextReview } from "../context/ReviewContext";

export const RestuarantDetails = () => {
  const { restuarantId } = useParams();
  const {
    selectedRating,
    reviewerName,
    reviewerComment,
    setSelectedRating,
    setReviewerName,
    setReviewerComment,
    handleReview,
    allRestuarantsData,
  } = useContext(ContextReview);

  const selectedRestuarant = allRestuarantsData?.find(
    ({ id }) => id === Number(restuarantId)
  );

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "0",
    boxShadow: 24,
    p: 4,
  };

  console.log(selectedRestuarant);
  return (
    <div className="restuarant-details-wrapper">
      <h1>{selectedRestuarant?.name}</h1>
      <div className="restuarant-details">
        <div className="details-about-restuarant">
          <p className="menus">
            {selectedRestuarant?.menu?.map(({ name }) => (
              <span key={name}>{name}</span>
            ))}
          </p>
          <p className="address">{selectedRestuarant?.address}</p>
          <p className="avg-rating">
            Average Rating: {selectedRestuarant?.averageRating}
          </p>
        </div>
        <Button onClick={handleOpen} className="add-new-review">
          Add Review
        </Button>
      </div>
      <div className="reviews-wrapper">
        <h2>Reviews</h2>

        <div className="user-rating-wrapper">
          {selectedRestuarant?.ratings?.map((rating, index) => (
            <div key={index} className="user-details">
              <div className="user-details-wrapper">
                <div className="user-basic-details">
                  <img src={rating.pp} alt={rating.revName} />
                  <p className="rating-name">{rating.revName}</p>
                </div>
                <p className="rating-comment">{rating.comment}</p>
              </div>
              <p className="rating">{rating.rating}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Add Review
              </Typography>
              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  Name
                </label>
                <input
                  className="form-input"
                  type="text"
                  id="name"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="Enter your Name"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="comment">
                  Comment
                </label>
                <input
                  className="form-input"
                  type="text"
                  id="comment"
                  value={reviewerComment}
                  onChange={(e) => setReviewerComment(e.target.value)}
                  placeholder="Enter your Review"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="rating">
                  Rating
                </label>
                <select
                  id="rating"
                  className="form-input"
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                >
                  <option value="">Select Rating</option>
                  <option value="5">5</option>
                  <option value="4">4</option>
                  <option value="3">3</option>
                  <option value="2">2</option>
                  <option value="1">1</option>
                </select>
              </div>
              <div className="buttons">
                <button className="modal-button" onClick={handleClose}>
                  Discard
                </button>
                <button
                  className="modal-button"
                  onClick={() => {
                    handleClose();
                    handleReview(restuarantId);
                  }}
                >
                  Add Review
                </button>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
      <Link to="/" className="left-arrow"></Link>
    </div>
  );
};
