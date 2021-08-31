import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "../css/Pagination.css";

const Pagination = ({ data }) => {
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const pagesVisted = pageNumber * usersPerPage;

  const displayIssues = data
    .slice(pagesVisted, pagesVisted + usersPerPage)
    .map((el) => {
      return (
        <div className="Issue" key={el.id}>
          <div>이슈 제목은 {el.title}</div>
          <div>issue 상황은 {el.state}</div>
          <div>
            이슈 작성자 이름은 {el.user.login} 이슈 작성자 사진은{" "}
            {el.user.avatar_url}
          </div>
          <div>주소는{el.html_url}</div>
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
