import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import "../css/Cards.css";
import matthew from "../images/matthew.png";

const Cards = ({
  avatar,
  name,
  user,
  description,
  forks,
  watchers,
  language,
  url,
  issues,
}) => {
  return (
    <>
      <div className="Cards_Info">
        <Card className="Cards_Card">
          <Image src={avatar || matthew} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{name || "Name of Repository"}</Card.Header>
            <Card.Meta>
              <span className="date">{user || "Gil-Dong Hong"}</span>
            </Card.Meta>
            <Card.Description>
              {description || "Description of Repository"}
            </Card.Description>
          </Card.Content>
          <Card.Content
            extra
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <a>
              <Icon name="fork" />
              {forks || "0"}
            </a>
            <a>
              <Icon name="eye" />
              {watchers || "0"}
            </a>
            <a>
              <Icon name="language" />
              {language || "JavaScript"}
            </a>
          </Card.Content>
          <Card.Content extra>
            <a href={url || null} target="_blank" rel="noreferrer">
              <Icon name="tag" />
              해당 레포지토리로 이동하기
            </a>
          </Card.Content>
          <Card.Content extra>
            <a target="_blank" rel="noreferrer">
              <Icon name="exclamation circle" />총 {issues ? issues : 0}
              개의 이슈가 있습니다.
            </a>
          </Card.Content>
        </Card>
      </div>
    </>
  );
};

export default Cards;
