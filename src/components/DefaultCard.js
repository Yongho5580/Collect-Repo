import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const DefaultCard = () => {
  return (
    <div>
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
  );
};

export default DefaultCard;
