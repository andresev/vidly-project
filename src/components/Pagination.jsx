import React from "react";
import _ from "lodash";

const Pagination = ({ itemCount, pageSize }) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  console.log(pageCount);
  if (pageCount === 1) {
    return null;
  }
  const pages = _.range(1, pageCount + 1, 1);

  return (
    <nav aria-label="...">
      <ul className="pagination pagination-lg">
        {pages.map((page) => (
          <li key={page} className="page-item" aria-current="page">
            <a className="page-link">{page}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
