import React, { memo, useEffect } from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "../css/Results.css";
import Error from "../images/error.gif";

const Results = ({ repos, isLoading }) => {
  // 상위컴포넌트에서 input에 타이핑할 시 자식컴포넌트가 한 글자당 렌더링되는걸 확인.
  // React.memo를 사용함으로써 리렌더링 방지했음.
  let arr = [];

  // 레포지토리 추가 시 중복 검사하는 함수
  const isOverlap = (element) => {
    return Boolean(arr.find((item) => item.id === element));
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
      if (isOverlap(repos.id)) {
        window.confirm("중복되는 레포지토리가 있습니다.");
        return;
      }
      arr.push(repos);
      // 로컬스토리지에 추가
      localStorage.setItem("repos", JSON.stringify(arr));
      window.confirm("레포지토리를 추가했습니다.");
    } else {
      return;
    }
  };
  const getRepos = localStorage.getItem("repos");
  if (getRepos !== null) {
    const parsedRepos = JSON.parse(getRepos);
    arr = parsedRepos;
  }
  console.log(repos);
  console.log(arr.length);

  return (
    <>
      {!isLoading && (
        <div className="Results">
          <div className="Results_Info">
            <div className="Results_Introduce">
              <h2>Collect Repo</h2>
            </div>
            <Card className="Results_Card">
              <Image
                src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                wrapped
                ui={false}
              />
              <Card.Content>
                <Card.Header>Name of Repository</Card.Header>
                <Card.Meta>
                  <span className="date">Gil-Dong Hong</span>
                </Card.Meta>
                <Card.Description>Description of Repository</Card.Description>
              </Card.Content>
              <Card.Content
                extra
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <a>
                  <Icon name="fork" />3
                </a>
                <a>
                  <Icon name="eye" />5
                </a>
                <a>
                  <Icon name="language" />
                  Javascript
                </a>
              </Card.Content>
              <Card.Content extra>
                <a target="_blank" rel="noreferrer">
                  <Icon name="tag" />
                  Go to Repository
                </a>
              </Card.Content>
            </Card>
          </div>
        </div>
      )}
      {isLoading &&
        repos === undefined &&
        window.alert("유저는 존재하나, 해당 레포지토리는 존재하지 않습니다.")}
      {isLoading && repos === undefined && (
        <div className="Results">
          <img src={Error} />
        </div>
      )}
      {isLoading && repos && (
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
      )}
    </>
  );
};

export default memo(Results);

/*
      {isLoading && isEmpty ? (
        <div className="Results">레포지토리가 없습니다.</div>
      ) : (
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
      )}
*/
