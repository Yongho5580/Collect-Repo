import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "../css/Pagination.css";
import { VscIssueClosed, VscIssues } from "react-icons/vsc";

const Pagination = ({ data, reposName }) => {
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const pagesVisted = pageNumber * usersPerPage;

  const displayIssues = data
    .slice(pagesVisted, pagesVisted + usersPerPage)
    .map((el) => {
      return (
        <div className="Issue" key={el.id}>
          <div className="Issue_FirstLine">
            {el.state === "open" ? (
              <span className="Issue_State">
                <VscIssues style={{ color: "green" }} />
              </span>
            ) : (
              <span className="Issue_State">
                <VscIssueClosed style={{ color: "red" }} />
              </span>
            )}
            <a
              className="Issue_Anchor"
              href={el.html_url}
              target="_blank"
              rel="noreferrer"
            >
              {el.title}
            </a>
          </div>
          <div className="Issue_UserInfo">
            <img
              className="Issue_UserImg"
              src={el.user.avatar_url}
              alt="user"
            />
            <div className="Issue_UserName">&nbsp; {el.user.login}</div>
            <div className="Issue_ReposName">&nbsp; ({reposName})</div>
          </div>
        </div>
      );
    });

  const pageCount = Math.ceil(data.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="Collections_Pagination">
      {displayIssues}
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
};

export default Pagination;
