export { ListsCatalogPopup } from './listsCatalog/ListsCatalogPopup';
export { LoginPopupOffer } from './loginOffer/LoginPopupOffer';
export { Notification } from './notification/Notification';

// reducers
export { themeReducer as theme } from './theme/themeSlice';
export { bestGamesReducer as bestGames } from './games/bestGamesSlice';
export { bestMoviesReducer as bestMovies } from './movies/bestMoviesSlice';
export { movieInfoReducer as movieInfo } from './movies/loadMovieInfoSlice';
export { userReducer as user } from './auth/userSlice';
export { gameInfoReducer as gameInfo } from './games/loadGameInfoSlice';
export { searchReducer as search } from './search/searchSlice';
export { LoginPopupOfferReducer as loginPopup } from './loginOffer/loginOfferSlice';
export { notificationReducer as notification } from './notification/notificationSlice';
export { listsCatalogReducer as listsCatalog } from './listsCatalog/listsCatalogSlice';
