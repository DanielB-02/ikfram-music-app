import {Link} from "react-router-dom";
import React from "react";

const ArtistImageLink = ({song}) => {
  let link;
  if ('artists' in song) {
    link =
      <Link to={`/artists/${song?.artists[0].adamid}`}>
        <img src={song?.images?.background} alt="Name" className="rounded-full w-full object-cover" />
      </Link>;
  } else {
    link =
      <img src={song?.images?.background} alt="Name" className="rounded-full w-full object-cover" />;
  }

  return (
    <div>
      {link}
    </div>
  );
}

export default ArtistImageLink;
