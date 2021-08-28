import React, { useState } from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "../css/Results.css";

const Results = ({ repos, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <div className="Results">Loading...</div>
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
            <button>추가하기</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Results;
