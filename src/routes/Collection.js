import React, { useState } from "react";
import { Card, Icon, Image, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Link } from "react-router-dom";

const Collections = () => {
  const [update, setUpdate] = useState(false);
  let arr = [];
  const getRepos = JSON.parse(localStorage.getItem("repos"));
  if (getRepos !== null) {
    arr = getRepos;
  }

  const onDeleteClick = (e) => {
    const ok = window.confirm("해당 레포지토리를 삭제하시겠습니까?");
    if (ok) {
      const cardId = e.target.id;
      arr = arr.filter((el) => el.id !== parseInt(cardId));
      localStorage.setItem("repos", JSON.stringify(arr));
      window.confirm("삭제가 완료되었습니다.");
      if (!update) {
        setUpdate(true);
      } else {
        setUpdate(false);
      }
    } else {
      return;
    }
  };

  return (
    <div className="Collections">
      <Link to="/">Home</Link>
      <div className="Collections_Lists">
        {getRepos.map((el) => {
          return (
            <div key={el.id}>
              <div className="Collections_List">
                <Card className="Results_Card">
                  <Image src={el.owner.avatar_url} wrapped ui={false} />
                  <Card.Content>
                    <Card.Header>{el.name}</Card.Header>
                    <Card.Meta>
                      <span className="date">{el.owner.login}</span>
                    </Card.Meta>
                    <Card.Description>{el.description}</Card.Description>
                  </Card.Content>
                  <Card.Content
                    extra
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <a>
                      <Icon name="fork" />
                      {el.forks}
                    </a>
                    <a>
                      <Icon name="eye" />
                      {el.watchers}
                    </a>
                    <a>
                      <Icon name="language" />
                      {el.language}
                    </a>
                  </Card.Content>
                  <Card.Content extra>
                    <a href={el.html_url} target="_blank" rel="noreferrer">
                      <Icon name="tag" />
                      Go to Repository
                    </a>
                  </Card.Content>
                </Card>
              </div>
              <div className="Results_BtnAdd">
                <Button id={el.id} onClick={onDeleteClick} negative>
                  삭제하기
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Collections;
