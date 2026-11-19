import { Link } from 'react-router-dom';
import React from 'react';

const ArtistTitleLink = ({ song }) => {
  let link;
  if ('artists' in song) {
    link = (
      <Link to={`/artists/${song?.artists[0].adamid}`}>
        <p className="text-base text-gray-300 mt-1">
          {song?.subtitle}
        </p>
      </Link>
    );
  } else {
    link = (
      <p className="text-base text-gray-450 mt-1">
        {song?.subtitle}
      </p>
    );
  }

  return (
    <div>
      {link}
    </div>
  );
};

export default ArtistTitleLink;
