import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/Like";
import Pagination from "./Pagination";
import { paginate, Paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1,
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  handleRefresh = () => {
    this.setState({ movies: getMovies() });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    //const { length: count } = this.state.movies;

    //movies state has been alias to allMovies. Only works within render method. Because it's not set globally
    const { pageSize, currentPage, movies: allMovies } = this.state;

    if (allMovies.length === 0) {
      return (
        <div>
          <p>There are no movies. Please try again later. Thank you.</p>
          <button
            onClick={this.handleRefresh}
            type="button"
            class="btn btn-primary"
          >
            Refresh
          </button>
        </div>
      );
    }

    // movies, currentPage, pageSize have been destructured = this.state
    const movies = paginate(allMovies, currentPage, pageSize);

    return (
      <div>
        <p>Showing {allMovies.length} movies in the database.</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allMovies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movie.liked}
                    likeClicked={() => this.handleLike(movie)}
                  />
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    type="button"
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* pageSize and currentPage have been destructured above. */}
        <Pagination
          itemCount={allMovies.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />

        <button
          onClick={this.handleRefresh}
          type="button"
          className="btn btn-primary"
        >
          Refresh
        </button>
      </div>
    );
  }
}

export default Movies;
