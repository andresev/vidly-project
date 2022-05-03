import React from "react";

const ListGroup = ({ genre, currentGenre, onGenreChange }) => {
  return (
    <div>
      <ul className="list-group">
        {genre.map((genres) => (
          <li
            key={genres._id}
            onClick={() => onGenreChange(genre)}
            className={
              currentGenre === genres.name
                ? "list-group-item active"
                : "list-group-item"
            }
            aria-current="true"
          >
            {genres.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListGroup;
