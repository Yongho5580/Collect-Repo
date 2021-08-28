import React, { useState } from "react";
import Results from "./Results";
import axios from "axios";
import { Form, Input, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "../css/Search.css";

const SearchBar = () => {
  const [repoInput, setRepoInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [repos, setRepos] = useState([]);

  const onNameChange = (e) => {
    setNameInput(e.target.value);
  };

  const onRepoChange = (e) => {
    setRepoInput(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { items },
      } = await axios.get(
        `https://api.github.com/search/repositories?q=${repoInput}+user:${nameInput}`
      );
      setRepos(items);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  console.log(repos);
  console.log(isLoading);
  return (
    <>
      <div className="SearchBar">
        <div className="SearchBar_Items">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="유저이름"
              onChange={onNameChange}
              value={nameInput}
              required
            />
            <input
              type="text"
              placeholder="레포지토리"
              onChange={onRepoChange}
              value={repoInput}
              required
            />
            <input type="submit" value="검색"></input>
          </form>
        </div>
      </div>
      <Results repos={repos[0]} isLoading={isLoading} />
    </>
  );
};

export default SearchBar;
