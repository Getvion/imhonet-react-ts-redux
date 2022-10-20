// components
export { ListsCatalogPopup } from './listsCatalog/ListsCatalogPopup';
export { LoginPopupOffer } from './loginOffer/LoginPopupOffer';
export { Notification } from './notification/Notification';

// reducers
export { themeReducer as theme } from './theme/themeSlice';
export { bestGamesReducer as bestGames } from './best/bestGamesSlice';
export { bestMoviesReducer as bestMovies } from './best/bestMoviesSlice';
export { userReducer as user } from './auth/userSlice';
export { searchReducer as search } from './search/searchSlice';
export { LoginPopupOfferReducer as loginPopup } from './loginOffer/loginOfferSlice';
export { notificationReducer as notification } from './notification/notificationSlice';
export { listsCatalogReducer as listsCatalog } from './listsCatalog/listsCatalogSlice';
export { pageDetailsReducer as pageDetails } from './details/pageDetailsSlice';
