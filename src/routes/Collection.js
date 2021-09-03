import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Link } from "react-router-dom";
import "../css/Collection.css";
import Cards from "../components/Cards";
import { AiOutlineHome } from "react-icons/ai";
import Modal from "../components/Modal";
import AOS from "aos";
import "aos/dist/aos.css";

const Collections = () => {
  // eslint-disable-next-line
  const [update, setUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [issueId, setIssueId] = useState();
  const [reposName, setReposName] = useState("");

  useEffect(() => {
    AOS.init();
  });

  let arr = [];
  const getRepos = JSON.parse(localStorage.getItem("repos"));
  if (getRepos !== null) {
    arr = getRepos;
  }

  const openModal = (e) => {
    const cardId = e.target.id;
    const cardName = e.target.name;
    setReposName(cardName);
    setIssueId(cardId);
    setShowModal((prev) => !prev);
  };

  // 선택한 레포지토리를 삭제하는 함수
  const onDeleteClick = (e) => {
    const ok = window.confirm("해당 레포지토리를 삭제하시겠습니까?");
    if (ok) {
      const cardId = e.target.id;
      console.log(cardId);
      arr = arr.filter((el) => el[0].id !== parseInt(cardId));
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
      <div
        data-aos="fade-right"
        data-aos-duration={700}
        className="Collections_Link"
      >
        <Link to="/">
          <AiOutlineHome className="Collections_Icon" />
        </Link>
      </div>
      <div
        data-aos="zoom-out"
        data-aos-duration={500}
        className="Collections_Lists"
      >
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
                    <Button
                      id={repos[0].id}
                      name={repos[0].name}
                      onClick={openModal}
                    >
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
          <></>
        )}
      </div>
      {getRepos ? (
        <Modal
          reposName={reposName}
          issueId={issueId}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      ) : null}
      {getRepos === null || getRepos.length === 0 ? (
        <div className="ErrorPage">
          <span>Ooops.. 아직 레포지토리가 없습니다.</span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Collections;
