import React, {useEffect, useState} from 'react';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import {
  Bs0Circle,
  BsArrowRepeat,
  BsFillHeartFill,
  BsFillPauseFill,
  BsFillPlayFill,
  BsHeart,
  BsHeartFill,
  BsShuffle
} from 'react-icons/bs';

const Controls = ({ isPlaying, activeSong, repeat, setRepeat, shuffle, setShuffle, currentSongs, handlePlayPause, handlePrevSong, handleNextSong, setHeart, favoriteSongs, setFavoriteSongs }) => {
  const [showHeart, setShowHeart] = useState(false);

  useEffect(() => {
    setShowHeart(songIsInFavorites());
  }, [activeSong]);

  const handleHeartClick = () => {
    if (songIsInFavorites()) {
      setFavoriteSongs((prevFavorites) =>
        prevFavorites.filter((song) => song.key !== activeSong.key));
        setShowHeart(false);
    } else {
      setFavoriteSongs((prevFavorites) => [...prevFavorites, activeSong]);
      setShowHeart(true);
    }
  };

  const handleXClick = () => {
    setX(x !== true);
  }

  const songIsInFavorites = () => {
    const found = favoriteSongs.find(song => song.key === activeSong.key);
    return found !== undefined;
  }

  return (
    <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80">
      <BsArrowRepeat size={20} color={repeat ? 'red' : 'white'} onClick={() => setRepeat((prev) => !prev)} className="hidden sm:block cursor-pointer" />
      {currentSongs?.length && <MdSkipPrevious size={30} color="#FFF" className="cursor-pointer" onClick={handlePrevSong} />}
      {isPlaying ? (
        <BsFillPauseFill size={45} color="#FFF" onClick={handlePlayPause} className="cursor-pointer" />
      ) : (
        <BsFillPlayFill size={45} color="#FFF" onClick={handlePlayPause} className="cursor-pointer" />
      )}
      {currentSongs?.length && <MdSkipNext size={30} color="#FFF" className="cursor-pointer" onClick={handleNextSong} />}
      <BsShuffle size={20} color={shuffle ? 'red' : 'white'} onClick={() => setShuffle((prev) => !prev)} className="hidden sm:block cursor-pointer" />
      <BsHeartFill size={20} color={showHeart ? 'red' : 'white'} onClick={handleHeartClick} className="hidden sm:block cursor-pointer" />
    </div>
  );
};

export default Controls;
