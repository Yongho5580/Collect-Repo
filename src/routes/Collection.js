import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Link } from "react-router-dom";
import "../css/Collection.css";
import { Mdclose } from "react-icons/md";
import Cards from "../components/Cards";
// 이슈보기 버튼을 누르면 그 때 해당 레포지토리의 id 그런거 받아와서 issue 데이터 get 하고 그걸 모달창으로 보여준다.
// 페이지네이션 또한 모달창에서 처리한다.

const Collections = () => {
  const [update, setUpdate] = useState(false);

  let arr = [];
  const getRepos = JSON.parse(localStorage.getItem("repos"));
  if (getRepos !== null) {
    arr = getRepos;
  }

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

  console.log(getRepos);

  // el.id, el.owner.login, el.description, el.forks, el.language, el.watchers, el.html_url, onDeleteClick

  return (
    <div className="Collections">
      <Link to="/">Home</Link>
      <div className="Collections_Lists">
        {getRepos.map((el) => {
          console.log(el);
          return (
            <div className="Collections_List" key={el.id}>
              <div className="Collections_Card">
                <Cards
                  avatar={el.owner.avatar_url}
                  name={el.name}
                  user={el.owner.login}
                  description={el.description}
                  forks={el.forks}
                  watchers={el.watchers}
                  language={el.language}
                  url={el.html_url}
                />
                <div className="Collections_BtnDelete">
                  <Button id={el.id} onClick={onDeleteClick} negative>
                    삭제하기
                  </Button>
                </div>
              </div>
              <div className="Collections_Issues">Issues</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Collections;
