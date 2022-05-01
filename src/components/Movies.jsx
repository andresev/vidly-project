import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/Like";
import Pagination from "./Pagination";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
  };

  handleDelete = (movie) => {
    console.log(movie);
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  handleRefresh = () => {
    console.log("Refresh button is pressed");
    console.log(getMovies());

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
    console.log(page);
  };

  render() {
    if (this.state.movies.length === 0) {
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

    return (
      <div>
        <p>Showing {this.state.movies.length} movies in the database.</p>
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
            {this.state.movies.map((movie) => (
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

        <Pagination
          itemCount={this.state.movies.length}
          pageSize={this.state.pageSize}
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
