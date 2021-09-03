import React, { memo, useEffect } from "react";
import "../css/Modal.css";
import { MdClose } from "react-icons/md";
import Pagination from "../components/Pagination";
import AOS from "aos";
import "aos/dist/aos.css";

const Modal = ({ issueId, reposName, showmodal, setShowModal }) => {
  useEffect(() => {
    AOS.init();
  });

  const getRepos = JSON.parse(localStorage.getItem("repos"));

  const getIssues = getRepos.filter((el) => {
    return el[0].id === parseInt(issueId);
  });

  const onClick = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      {showmodal ? (
        <div className="Modal">
          <div
            data-aos="zoom-in"
            className="Modal_Wrapper"
            showmodal={showmodal}
          >
            <div className="Modal_Content">
              <Pagination data={getIssues[0][1].data} reposName={reposName} />
            </div>
            <div
              className="Modal_CloseBtn"
              aria-label="Close Modal"
              onClick={onClick}
            >
              <MdClose style={{ fontSize: "1.8rem" }} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default memo(Modal);
