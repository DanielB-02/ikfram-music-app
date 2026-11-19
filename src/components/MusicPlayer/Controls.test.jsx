import { useState } from 'react';
import {
  afterEach, describe, expect, it,
} from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/react';
import Controls from './Controls';

const song = { key: 'song-1', title: 'Song 1' };
const noop = () => {};

// Renders Controls with real favourites state, like App.jsx does.
const Harness = ({ initialFavorites = [], onChange = noop }) => {
  const [favoriteSongs, setFavoriteSongs] = useState(initialFavorites);
  onChange(favoriteSongs);
  return (
    <Controls
      isPlaying={false}
      activeSong={song}
      repeat={false}
      setRepeat={noop}
      shuffle={false}
      setShuffle={noop}
      currentSongs={[song]}
      handlePlayPause={noop}
      handlePrevSong={noop}
      handleNextSong={noop}
      favoriteSongs={favoriteSongs}
      setFavoriteSongs={setFavoriteSongs}
    />
  );
};

// The heart is the last icon in the controls row.
const getHeart = (container) => {
  const icons = container.querySelectorAll('svg');
  return icons[icons.length - 1];
};

afterEach(cleanup);

describe('Controls favourites (heart)', () => {
  it('adds the active song to favourites and colours the heart red', () => {
    let favorites = [];
    const { container } = render(<Harness onChange={(f) => { favorites = f; }} />);

    expect(getHeart(container).getAttribute('color')).toBe('white');
    fireEvent.click(getHeart(container));

    expect(favorites).toEqual([song]);
    expect(getHeart(container).getAttribute('color')).toBe('red');
  });

  it('removes the song again on a second click (unfavourite)', () => {
    let favorites = [];
    const { container } = render(<Harness initialFavorites={[song]} onChange={(f) => { favorites = f; }} />);

    expect(getHeart(container).getAttribute('color')).toBe('red');
    fireEvent.click(getHeart(container));

    expect(favorites).toEqual([]);
    expect(getHeart(container).getAttribute('color')).toBe('white');
  });

  it('toggles consistently and never stores duplicates across repeated clicks', () => {
    let favorites = [];
    const { container } = render(<Harness onChange={(f) => { favorites = f; }} />);

    fireEvent.click(getHeart(container));
    fireEvent.click(getHeart(container));
    fireEvent.click(getHeart(container));

    expect(favorites).toEqual([song]);
  });
});
