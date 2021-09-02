import React, { memo, useEffect } from "react";
import { Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "../css/Results.css";
import Cards from "./Cards";
import AOS from "aos";
import "aos/dist/aos.css";

const Results = ({ repos, issues, isLoading }) => {
  // 상위컴포넌트에서 input에 타이핑할 시 자식컴포넌트가 한 글자당 렌더링되는걸 확인.
  // React.memo를 사용함으로써 리렌더링 방지했음.

  useEffect(() => {
    AOS.init();
  });

  // 레포지토리 추가 시 중복 검사하는 함수
  const isOverlap = (element) => {
    return Boolean(arr.find((item) => item[0].id === element));
  };

  // 로컬스토리지에 해당 레포지토리 정보를 저장하는 함수
  const onAddClick = (e) => {
    e.preventDefault();
    const ok = window.confirm("해당 레포지토리를 추가하시겠습니까?");
    if (ok) {
      // 개수 검사
      if (arr.length === 4) {
        window.confirm("최대 레포지토리 개수는 4개입니다.");
        return;
      }
      // 중복 검사
      if (isOverlap(repos[0].id)) {
        window.confirm("중복되는 레포지토리가 있습니다.");
        return;
      }
      // 로컬스토리지에 추가
      const concat = repos.concat(issues);
      arr.push(concat);
      localStorage.setItem("repos", JSON.stringify(arr));
      window.confirm("레포지토리를 추가했습니다.");
    } else {
      return;
    }
  };

  let arr = [];
  const getRepos = JSON.parse(localStorage.getItem("repos"));
  if (getRepos !== null) {
    arr = getRepos;
  }

  return (
    <>
      {!isLoading && (
        <div data-aos="fade-up" data-aos-duration={800} className="Results">
          <div className="Results_Info">
            <Cards />
          </div>
        </div>
      )}
      {isLoading &&
        repos[0] === undefined &&
        window.alert(
          "유저는 존재하나, 해당 레포지토리는 존재하지 않습니다. 오타가 있는지 확인해주세요."
        )}
      {isLoading && repos[0] && (
        <div data-aos="fade-up" data-aos-duration={800} className="Results">
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
          <div className="Cards_BtnAdd">
            <Button onClick={onAddClick} color="grey">
              Pick!
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(Results);
