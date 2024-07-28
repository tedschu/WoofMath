import React from "react";
import { useState, useEffect } from "react";
import bernese from "../assets/bernese.png";
import chihuahua from "../assets/chihuahua.png";
import boxer from "../assets/boxer.png";
import husky from "../assets/husky.png";
import golden from "../assets/golden.png";
import cat from "../assets/cat.png";
import goldendoodleTrophy from "../assets/goldendoodle_trophy_large.png";

function BadgeModal({ isModalOpen, closeModal, modalBadge }) {
  if (!isModalOpen) return null;

  // const [returnedUsers, setReturnedUsers] = useState([]);
  // const [noUsers, setNoUsers] = useState(false);

  let badgeImage = null;

  switch (modalBadge) {
    case "bernese":
      badgeImage = bernese;
      break;
    case "chihuahua":
      badgeImage = chihuahua;
      break;
    case "boxer":
      badgeImage = boxer;
      break;
    case "husky":
      badgeImage = husky;
      break;
    case "golden":
      badgeImage = golden;
      break;
    case "cat":
      badgeImage = cat;
      break;
    case "goldendoodle_trophy":
      badgeImage = goldendoodleTrophy;
      break;
  }

  return (
    <>
      <div className="badgeModalOverlay">
        <div className="badgeModalContent">
          <h2>YASSSSS! YOU WON THE {modalBadge} BADGE!</h2>

          <img src={badgeImage} alt="" />

          <button className="modalClose" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}

export default BadgeModal;
