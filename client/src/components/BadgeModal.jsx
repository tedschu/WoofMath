import React from "react";
import { useState, useEffect } from "react";

function BadgeModal({ isModalOpen, closeModal, badgeName }) {
  if (!isModalOpen) return null;

  const [returnedUsers, setReturnedUsers] = useState([]);
  const [noUsers, setNoUsers] = useState(false);

  console.log(badgeName);

  return (
    <>
      <div className="badgeModalOverlay">
        <div className="badgeModalContent">
          <h2>YASSSSS! YOU WON THE {badgeName} BADGE!</h2>

          <button className="modalClose" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}

export default BadgeModal;
