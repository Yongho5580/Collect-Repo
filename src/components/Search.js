import React, { useState, useEffect } from "react";
import Results from "./Results";
import axios from "axios";
import "semantic-ui-css/semantic.min.css";
import "../css/Search.css";

const SearchBar = () => {
  const [repoInput, setRepoInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    console.log("Search comp is rendering");
  });

  // 유저명 입력 받아오는 event
  const onNameChange = (e) => {
    setNameInput(e.target.value);
  };
  // 레포지토리명 입력 받아오는 event
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
      const issues = await axios.get(
        `https://api.github.com/repos/${nameInput}/${repoInput}/issues`
      );
      items.push(issues);
      console.log(items);
      setRepos(items);
    } catch (error) {
      // 에러 핸들링
      if (error.response.status === 422) {
        window.confirm(
          "해당 유저는 존재하지 않습니다. 오타가 있는지 다시 한 번 확인해주세요."
        );
      }
      if (error.response.status === 404) {
        window.confirm(
          "해당 레포지토리는 존재하지 않습니다. 레포지토리명을 정확히 입력해주세요."
        );
      }
    }
    // 비동기 과정이 모두 끝나면 loading이 되게 하는 state
    setIsLoading(true);
  };

  return (
    <>
      <div className="Search">
        <div className="Search_Items">
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
      <Results repos={repos[0]} issues={repos[1]} isLoading={isLoading} />
    </>
  );
};

export default SearchBar;
