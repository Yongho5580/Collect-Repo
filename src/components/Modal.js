import React, { useEffect, memo } from "react";
import "../css/Modal.css";
import { MdClose } from "react-icons/md";
import Pagination from "../components/Pagination";

const Modal = ({ issueId, showModal, setShowModal }) => {
  const getRepos = JSON.parse(localStorage.getItem("repos"));
  const getIssues = getRepos.filter((el) => {
    return el[0].id === parseInt(issueId);
  });

  return (
    <>
      {showModal ? (
        <div className="Modal">
          <div className="Modal_Wrapper" showModal={showModal}>
            <div className="Modal_Content">
              <Pagination data={getIssues[0][1].data} />
            </div>
            <div
              className="Modal_CloseBtn"
              aria-label="Close Modal"
              onClick={() => setShowModal((prev) => !prev)}
            >
              <MdClose />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default memo(Modal);
