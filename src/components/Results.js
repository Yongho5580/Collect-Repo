import React, { useState, useEffect } from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "../css/Results.css";

const Results = ({ repos, isLoading }) => {
  let arr = [];

  useEffect(() => {
    console.log("im rendering");
  }, []);

  // 레포지토리 추가 시 중복 검사하는 함수 (테스트용)
  const isOverlap = (element) => {
    if (element.id === 390230462) {
      return true;
    }
  };

  const onAddClick = (e) => {
    e.preventDefault();
    const ok = window.confirm("해당 레포지토리를 추가하시겠습니까?");
    if (ok) {
      if (arr.some(isOverlap)) {
        window.confirm("중복되는 레포지토리가 있습니다.");
        return;
      }
      arr.push(repos);
      localStorage.setItem("repos", JSON.stringify(arr));
    } else {
      return;
    }
  };

  const init = () => {
    const getRepos = localStorage.getItem("repos");
    if (getRepos !== null) {
      const parsedRepos = JSON.parse(getRepos);
      arr = parsedRepos;
    }
  };

  init();

  console.log(arr);

  return (
    <>
      {isLoading ? (
        <div className="Results">
          <div className="Results_Info">
            <Card className="Results_Card">
              <Image src={repos.owner.avatar_url} wrapped ui={false} />
              <Card.Content>
                <Card.Header>{repos.name}</Card.Header>
                <Card.Meta>
                  <span className="date">{repos.owner.login}</span>
                </Card.Meta>
                <Card.Description>{repos.description}</Card.Description>
              </Card.Content>
              <Card.Content
                extra
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <a>
                  <Icon name="fork" />
                  {repos.forks}
                </a>
                <a>
                  <Icon name="eye" />
                  {repos.watchers}
                </a>
                <a>
                  <Icon name="language" />
                  {repos.language}
                </a>
              </Card.Content>
              <Card.Content extra>
                <a href={repos.html_url} target="_blank" rel="noreferrer">
                  <Icon name="tag" />
                  Go to Repository
                </a>
              </Card.Content>
            </Card>
          </div>
          <div className="Results_BtnAdd">
            <button onClick={onAddClick}>추가하기</button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Results;
