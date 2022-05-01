import React from "react";
import _ from "lodash";

const Pagination = ({ itemCount, pageSize }) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  return (
    <nav aria-label="...">
      <ul class="pagination pagination-lg">
        {pages.map((page) => (
          <li key={page} class="page-item" aria-current="page">
            <a class="page-link">{page}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
