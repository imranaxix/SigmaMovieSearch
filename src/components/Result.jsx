import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tag from '../assets/tag.png';
import '../App.css';

const Box = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [genres, setGenres] = useState([]);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreListResponse = await axios.get(
          'https://api.themoviedb.org/3/genre/movie/list?api_key=04c35731a5ee918f014970082a0088b1'
        );
        setGenres(genreListResponse.data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  const getRating = (rating) => {
    if (rating >= 1 && rating < 4) {
      return 'Bad';
    } else if (rating >= 4 && rating < 7) {
      return 'Mid';
    } else if (rating >= 7 && rating < 7.6) {
      return 'Good';
    } else if (rating >= 7.6 && rating < 8.6) {
      return 'Great';
    } else if (rating >= 8.6 && rating <= 10) {
      return 'Goated';
    } else {
      return 'Not Rated';
    }
  };

  const getGenres = () => {
    const movieGenres = props.genre_ids.map((genreId) => {
      const genre = genres.find((g) => g.id === genreId);
      return genre ? genre.name : 'Unknown Genre';
    });

    return movieGenres.join(', ');
  };

  const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
  const tagImage = `url(${Tag})`;

  return (
    <div
      className='w-full  relative py-1'
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <div style={{ transform: 'rotate(-30deg)' }}>
        <div
          style={{
            backgroundImage: tagImage,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '220px',
          }}
          className='flex justify-center items-center absolute left-[-95px] top-[-110px]'
        >
          <h1 className='text-white protest-guerrilla-regular mt-2 text-xl'>
            {getRating(props.rating)}
          </h1>
        </div>
      </div>
      <div className='shadow min-h-[400px] max-h-[550px] bg-[#0b0b0d] border border-black'>
        <img src={IMGPATH + props.image} className='w-full select-none ' alt={props.title} />

        <div
          className={` opacity-0 transition-opacity duration-300 ease-in-out min-h-[400px] h-[100%] w-full max-h-full absolute font-bold mt-4 flex justify-start flex-col px-4 items-center left-0 bg-white ${
            isHovered ? 'opacity-90' : 'opacity-0'
          }`}
          style={{ top: '0', zIndex: '1', overflowY: 'auto' }}
        >
          <div className='flex justify-between items-center rounded-sm px-1 py-10'>
            <span className='text-xl text-black font-bold mr-8 protest-guerrilla-regular'>
              {props.title}
            </span>
            <span className='text-xl text-yellow-500 font-bold'>{props.rating}</span>
          </div>
          <div className='flex justify-start flex-col text-red-700 text-xs'>
            <h3 className='font-bold text-lg'>Overview:</h3>
            <p className='italic font-semibold text-xs text-black mb-2'>{props.overview}</p>
            <p>Released Date: <span className='font-semibold text-xs text-black'>{props.released}</span> </p>
            <p>Language: <span className='font-semibold text-xs text-black'>{props.language}</span> </p>
            <p>Genres: <span className='font-semibold text-xs italic text-black'>{getGenres()}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Result(props) {
  const boxes = props.movies.map((item, index) => {
    return (
      <Box
        key={index}
        image={item.poster_path}
        title={item.original_title}
        rating={item.vote_average}
        overview={item.overview}
        released={item.release_date}
        language={item.original_language}
        genre_ids={item.genre_ids}
      />
    );
  });

  return (
    <div className='w-full grid md:grid-cols-2 lg:grid-cols-4 gap-8 '>
      {boxes}
    </div>
  );
}
