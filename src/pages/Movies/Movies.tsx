import React from 'react';

interface IMovies {
  name: string;
  movies: Array<IMovie>;
}

interface IMovie {
  title: string;
}

export const Movies: React.FC<IMovies> = ({ name, movies }) => {
  console.log(movies);
  return <div>Movies</div>;
};
