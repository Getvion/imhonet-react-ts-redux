import React from 'react';
import clsx from 'clsx';

import { Button } from '../../../components';

import classes from './Movie.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Link } from 'react-router-dom';

interface IMovie {
  kinopoiskID: number;
  imdbId: string;
  nameRu: string;
  nameEn: string;
  nameOriginal: string;
  posterUrl: string;
  posterUrlPreview: string;
  coverUrl: string;
  logoUrl: string;
  reviewsCount: number;
  ratingGoodReview: number;
  ratingGoodReviewVoteCount: number;
  ratingKinopoisk: number;
  ratingKinopoiskVoteCount: number;
  ratingImdb: number;
  ratingImdbVoteCount: number;
  ratingFilmCritics: number;
  ratingFilmCriticsVoteCount: number;
  ratingAwait: number;
  ratingAwaitCount: number;
  ratingRfCritics: number;
  ratingRfCriticsVoteCount: number;
  webUrl: string;
  year: number;
  filmLength: number;
  slogan: string;
  description: string;
  shortDescription: string;
  editorAnnotation: string;
  isTicketsAvailable: boolean;
  productionStatus: string;
  type: string;
  ratingMpaa: string;
  ratingAgeLimits: string;
  countries: { country: string }[];
  genres: { genre: string }[];
  startYear: number;
  endYear: number;
  serial: boolean;
}

// todo 1. если пользователь не вошел в аккаунт, то  показывать попап с просьбой авторизоваться
// todo https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=819101 - ссылка для получения актеров, режисерров, монтажеров и т.д.
// ! box-office, distribution, crew

export const Movie = () => {
  const movieInfo = [
    { descr: 'Год производства ', content: '2015' },
    { descr: 'Страна', content: 'США' },
    { descr: 'Жанр', content: 'кринманл, триллер' },
    { descr: 'Возраст', content: '18+' },
    { descr: 'Рейтинг MPAA', content: 'R' },
    { descr: 'Время', content: '187 мин. / 03:07' },
  ];

  const staff = [
    {
      staffId: 7640,
      nameRu: 'Квентин Тарантино',
      nameEn: 'Quentin Tarantino',
      description: null,
      posterUrl: 'https://kinopoiskapiunofficial.tech/images/actor_posters/kp/7640.jpg',
      professionText: 'Режиссеры',
      professionKey: 'DIRECTOR',
    },
    {
      staffId: 37652,
      nameRu: 'Курт Рассел',
      nameEn: 'Kurt Russell',
      description: 'John Ruth',
      posterUrl: 'https://kinopoiskapiunofficial.tech/images/actor_posters/kp/37652.jpg',
      professionText: 'Актеры',
      professionKey: 'ACTOR',
    },
    {
      staffId: 7164,
      nameRu: 'Сэмюэл Л. Джексон',
      nameEn: 'Samuel L. Jackson',
      description: 'Major Marquis Warren',
      posterUrl: 'https://kinopoiskapiunofficial.tech/images/actor_posters/kp/7164.jpg',
      professionText: 'Актеры',
      professionKey: 'ACTOR',
    },
    {
      staffId: 2145,
      nameRu: 'Тим Рот',
      nameEn: 'Tim Roth',
      description: 'Oswaldo Mobray',
      posterUrl: 'https://kinopoiskapiunofficial.tech/images/actor_posters/kp/2145.jpg',
      professionText: 'Актеры',
      professionKey: 'ACTOR',
    },
    {
      staffId: 7111,
      nameRu: 'Майкл Мэдсен',
      nameEn: 'Michael Madsen',
      description: 'Joe Gage',
      posterUrl: 'https://kinopoiskapiunofficial.tech/images/actor_posters/kp/7111.jpg',
      professionText: 'Актеры',
      professionKey: 'ACTOR',
    },
    {
      staffId: 20147,
      nameRu: 'Дженнифер Джейсон Ли',
      nameEn: 'Jennifer Jason Leigh',
      description: 'Daisy Domergue',
      posterUrl: 'https://kinopoiskapiunofficial.tech/images/actor_posters/kp/20147.jpg',
      professionText: 'Актеры',
      professionKey: 'ACTOR',
    },
    {
      staffId: 14969,
      nameRu: 'Уолтон Гоггинс',
      nameEn: 'Walton Goggins',
      description: 'Sheriff Chris Mannix',
      posterUrl: 'https://kinopoiskapiunofficial.tech/images/actor_posters/kp/14969.jpg',
      professionText: 'Актеры',
      professionKey: 'ACTOR',
    },
    {
      staffId: 81325,
      nameRu: 'Демиан Бичир',
      nameEn: 'Demián Bichir',
      description: 'Bob (в титрах: Demian Bichir)',
      posterUrl: 'https://kinopoiskapiunofficial.tech/images/actor_posters/kp/81325.jpg',
      professionText: 'Актеры',
      professionKey: 'ACTOR',
    },
    {
      staffId: 22241,
      nameRu: 'Брюс Дерн',
      nameEn: 'Bruce Dern',
      description: 'General Sandy Smithers',
      posterUrl: 'https://kinopoiskapiunofficial.tech/images/actor_posters/kp/22241.jpg',
      professionText: 'Актеры',
      professionKey: 'ACTOR',
    },
    {
      staffId: 18240,
      nameRu: 'Джеймс Паркс',
      nameEn: 'James Parks',
      description: 'O.B.',
      posterUrl: 'https://kinopoiskapiunofficial.tech/images/actor_posters/kp/18240.jpg',
      professionText: 'Актеры',
      professionKey: 'ACTOR',
    },
    {
      staffId: 2330167,
      nameRu: 'Дэна Гурье',
      nameEn: 'Dana Gourrier',
      description: 'Minnie Mink',
      posterUrl: 'https://kinopoiskapiunofficial.tech/images/actor_posters/kp/2330167.jpg',
      professionText: 'Актеры',
      professionKey: 'ACTOR',
    },
    {
      staffId: 10374,
      nameRu: 'Зои Белл',
      nameEn: 'Zoë Bell',
      description: 'Six-Horse Judy',
      posterUrl: 'https://kinopoiskapiunofficial.tech/images/actor_posters/kp/10374.jpg',
      professionText: 'Актеры',
      professionKey: 'ACTOR',
    },
    {
      staffId: 163087,
      nameRu: 'Ли Хорсли',
      nameEn: 'Lee Horsley',
      description: 'Ed',
      posterUrl: 'https://kinopoiskapiunofficial.tech/images/actor_posters/kp/163087.jpg',
      professionText: 'Актеры',
      professionKey: 'ACTOR',
    },
    {
      staffId: 111149,
      nameRu: 'Джин Джонс',
      nameEn: 'Gene Jones',
      description: 'Sweet Dave',
      posterUrl: 'https://kinopoiskapiunofficial.tech/images/actor_posters/kp/111149.jpg',
      professionText: 'Актеры',
      professionKey: 'ACTOR',
    },
  ];

  const similar = {
    total: 9,
    items: [
      {
        filmId: 586397,
        nameRu: 'Джанго освобожденный',
        nameEn: 'Django Unchained',
        nameOriginal: 'Django Unchained',
        posterUrl: 'https://kinopoiskapiunofficial.tech/images/posters/kp/586397.jpg',
        posterUrlPreview: 'https://kinopoiskapiunofficial.tech/images/posters/kp_small/586397.jpg',
        relationType: 'SIMILAR',
      },
      {
        filmId: 394,
        nameRu: 'Бешеные псы',
        nameEn: 'Reservoir Dogs',
        nameOriginal: 'Reservoir Dogs',
        posterUrl: 'https://kinopoiskapiunofficial.tech/images/posters/kp/394.jpg',
        posterUrlPreview: 'https://kinopoiskapiunofficial.tech/images/posters/kp_small/394.jpg',
        relationType: 'SIMILAR',
      },
      {
        filmId: 9691,
        nameRu: 'Бесславные ублюдки',
        nameEn: 'Inglourious Basterds',
        nameOriginal: 'Inglourious Basterds',
        posterUrl: 'https://kinopoiskapiunofficial.tech/images/posters/kp/9691.jpg',
        posterUrlPreview: 'https://kinopoiskapiunofficial.tech/images/posters/kp_small/9691.jpg',
        relationType: 'SIMILAR',
      },
      {
        filmId: 1047143,
        nameRu: 'Ничего хорошего в отеле «Эль Рояль»',
        nameEn: 'Bad Times at the El Royale',
        nameOriginal: 'Bad Times at the El Royale',
        posterUrl: 'https://kinopoiskapiunofficial.tech/images/posters/kp/1047143.jpg',
        posterUrlPreview: 'https://kinopoiskapiunofficial.tech/images/posters/kp_small/1047143.jpg',
        relationType: 'SIMILAR',
      },
      {
        filmId: 44156,
        nameRu: 'Десять негритят',
        nameEn: null,
        nameOriginal: null,
        posterUrl: 'https://kinopoiskapiunofficial.tech/images/posters/kp/44156.jpg',
        posterUrlPreview: 'https://kinopoiskapiunofficial.tech/images/posters/kp_small/44156.jpg',
        relationType: 'SIMILAR',
      },
      {
        filmId: 462553,
        nameRu: 'Железная хватка',
        nameEn: 'True Grit',
        nameOriginal: 'True Grit',
        posterUrl: 'https://kinopoiskapiunofficial.tech/images/posters/kp/462553.jpg',
        posterUrlPreview: 'https://kinopoiskapiunofficial.tech/images/posters/kp_small/462553.jpg',
        relationType: 'SIMILAR',
      },
      {
        filmId: 8366,
        nameRu: 'Нечто',
        nameEn: 'The Thing',
        nameOriginal: 'The Thing',
        posterUrl: 'https://kinopoiskapiunofficial.tech/images/posters/kp/8366.jpg',
        posterUrlPreview: 'https://kinopoiskapiunofficial.tech/images/posters/kp_small/8366.jpg',
        relationType: 'SIMILAR',
      },
      {
        filmId: 682648,
        nameRu: 'Великолепная семерка',
        nameEn: 'The Magnificent Seven',
        nameOriginal: 'The Magnificent Seven',
        posterUrl: 'https://kinopoiskapiunofficial.tech/images/posters/kp/682648.jpg',
        posterUrlPreview: 'https://kinopoiskapiunofficial.tech/images/posters/kp_small/682648.jpg',
        relationType: 'SIMILAR',
      },
      {
        filmId: 1008879,
        nameRu: 'Баллада Бастера Скраггса',
        nameEn: 'The Ballad of Buster Scruggs',
        nameOriginal: 'The Ballad of Buster Scruggs',
        posterUrl: 'https://kinopoiskapiunofficial.tech/images/posters/kp/1008879.jpg',
        posterUrlPreview: 'https://kinopoiskapiunofficial.tech/images/posters/kp_small/1008879.jpg',
        relationType: 'SIMILAR',
      },
    ],
  };

  const ratingImdb = 10;
  const ratingKinopoisk = 10;

  return (
    <div className={classes.movie}>
      <div className={classes.movie__top}>
        <img
          className={classes.movie__image}
          src='https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/b1add366-9e49-4ad8-905a-46ca23da8adc/140x210'
          alt='movie title'
        />
        <div className={classes.movie__title_wrapper}>
          <div className={classes.movie__inner}>
            <h1 className={classes.movie__title}>Омерзительная восьмерка</h1>
            <h2 className={classes.movie__original}>Original movie name</h2>
            <div className={classes.movie__add}>
              <Button text='Буду смотреть' onClick={() => console.log('hi')} /> {/* 1 */}
              <Button text='Любимый' onClick={() => console.log('hi')} />
            </div>
            <div className={classes.movie__info}>
              <h3 className={classes.movie__about}>О фильме</h3>
              <ul className={classes.movie__list}>
                {movieInfo.map((item) => (
                  <li key={item.descr} className={classes.movie__list_item}>
                    <span className={classes.movie__list_descr}>{item.descr}</span>
                    <span className={classes.movie__list_content}>{item.content}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={classes.movie__grades}>
            <span
              className={clsx(classes.movie__grade, {
                [classes.green]: ratingKinopoisk >= 7,
                [classes.yellow]: ratingKinopoisk >= 4 && ratingKinopoisk < 7,
                [classes.red]: ratingKinopoisk < 4,
              })}
            >
              {ratingKinopoisk}
            </span>
            <span
              className={clsx(classes.movie__grade, {
                [classes.green]: ratingImdb >= 7,
                [classes.yellow]: ratingImdb >= 4 && ratingImdb < 7,
                [classes.red]: ratingImdb < 4,
              })}
            >
              {ratingImdb}
            </span>
          </div>
        </div>
      </div>
      <div className={classes.movie__descr}>
        <h3 className={classes.movie__about}>О фильме</h3>
        <p className={classes.movie__descr_text}>
          США после Гражданской войны. Легендарный охотник за головами Джон Рут по кличке Вешатель
          конвоирует заключенную. По пути к ним прибиваются еще несколько путешественников. Снежная
          буря вынуждает компанию искать укрытие в лавке на отшибе, где уже расположилось весьма
          пестрое общество: генерал конфедератов, мексиканец, ковбой… И один из них - не тот, за
          кого себя выдает.
        </p>
      </div>

      <div className={classes.movie__ratings}>select rating</div>

      <div className={classes.roles}>
        <h3 className={classes.movie__about}>Актеры и роли</h3>
        <Swiper slidesPerView={5} spaceBetween={30} loop={false}>
          {staff.map((person) => (
            <div key={person.nameRu}>
              {person.professionKey === 'ACTOR' && (
                <SwiperSlide className={classes.roles__person}>
                  <img className={classes.roles__img} src={person.posterUrl} alt={person.nameRu} />
                  <span className={classes.roles__name}>{person.nameRu}</span>
                  <span className={classes.roles__role}>{person.description}</span>
                </SwiperSlide>
              )}
            </div>
          ))}
        </Swiper>
      </div>
      <div className={classes.similar}>
        <h3 className={classes.movie__about}>Похожие фильмы</h3>
        <Swiper slidesPerView={5} spaceBetween={10} loop={false}>
          {similar.items.map((item) => (
            <SwiperSlide className={classes.similar__movie} key={item.filmId}>
              <Link to={String(item.filmId)}>
                <img
                  className={classes.similar__img}
                  src={item.posterUrlPreview}
                  alt={item.nameRu}
                />
                <span className={classes.similar__name}>{item.nameRu}</span>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
