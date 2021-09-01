import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Link } from "react-router-dom";
import "../css/Collection.css";
import Cards from "../components/Cards";
import { AiOutlineHome } from "react-icons/ai";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";

const Collections = () => {
  const [update, setUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [issueId, setIssueId] = useState();

  let arr = [];
  const getRepos = JSON.parse(localStorage.getItem("repos"));
  if (getRepos !== null) {
    arr = getRepos;
  }

  const openModal = (e) => {
    const cardId = e.target.id;
    setIssueId(cardId);
    setShowModal((prev) => !prev);
  };

  // 선택한 레포지토리를 삭제하는 함수
  const onDeleteClick = (e) => {
    const ok = window.confirm("해당 레포지토리를 삭제하시겠습니까?");
    if (ok) {
      const cardId = e.target.id;
      arr = arr.filter((el) => el.id !== parseInt(cardId));
      localStorage.setItem("repos", JSON.stringify(arr));
      window.confirm("삭제가 완료되었습니다.");
      // 삭제 이후 리렌더링
      setUpdate((prev) => !prev);
    } else {
      return;
    }
  };

  return (
    <div className="Collections">
      <Link to="/">
        <AiOutlineHome />
      </Link>
      <div className="Collections_Lists">
        {getRepos ? (
          getRepos.map((repos) => {
            return (
              <div className="Collections_List" key={repos[0].id}>
                <div className="Collections_Card">
                  <Cards
                    avatar={repos[0].owner.avatar_url}
                    name={repos[0].name}
                    user={repos[0].owner.login}
                    description={repos[0].description}
                    forks={repos[0].forks}
                    watchers={repos[0].watchers}
                    language={repos[0].language}
                    url={repos[0].html_url}
                    issues={repos[0].open_issues}
                  />
                  <div className="Collections_Btns">
                    <Button id={repos[0].id} onClick={openModal}>
                      이슈보기
                    </Button>
                    <Button id={repos[0].id} onClick={onDeleteClick} negative>
                      삭제하기
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <>theres no repo</>
        )}
      </div>
      <Modal
        issueId={issueId}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default Collections;
