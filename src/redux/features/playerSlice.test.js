import { describe, expect, it } from 'vitest';
import reducer, {
  nextSong, playPause, prevSong, selectGenreListId, setActiveSong,
} from './playerSlice';

const songA = { key: 'a', title: 'Song A' };
const songB = { key: 'b', title: 'Song B' };
const songC = { key: 'c', title: 'Song C' };

const initial = reducer(undefined, { type: '@@INIT' });

describe('playerSlice', () => {
  it('starts with an inactive, paused player', () => {
    expect(initial).toMatchObject({
      currentSongs: [], currentIndex: 0, isActive: false, isPlaying: false, activeSong: {},
    });
  });

  describe('setActiveSong', () => {
    it('uses a plain array of songs as the queue', () => {
      const state = reducer(initial, setActiveSong({ song: songB, data: [songA, songB], i: 1 }));
      expect(state.activeSong).toEqual(songB);
      expect(state.currentSongs).toEqual([songA, songB]);
      expect(state.currentIndex).toBe(1);
      expect(state.isActive).toBe(true);
    });

    it('uses tracks.hits from a search response as the queue', () => {
      const hits = [{ track: songA }, { track: songB }];
      const state = reducer(initial, setActiveSong({ song: songA, data: { tracks: { hits } }, i: 0 }));
      expect(state.currentSongs).toEqual(hits);
    });

    it('uses tracks from an artist response (has properties) as the queue', () => {
      const data = { properties: {}, tracks: [songA, songC] };
      const state = reducer(initial, setActiveSong({ song: songC, data, i: 1 }));
      expect(state.currentSongs).toEqual([songA, songC]);
    });
  });

  describe('nextSong / prevSong', () => {
    const playing = reducer(initial, setActiveSong({ song: songA, data: [songA, songB, songC], i: 0 }));

    it('nextSong moves to the given index', () => {
      const state = reducer(playing, nextSong(1));
      expect(state.activeSong).toEqual(songB);
      expect(state.currentIndex).toBe(1);
    });

    it('prevSong moves to the given index', () => {
      const state = reducer(playing, prevSong(2));
      expect(state.activeSong).toEqual(songC);
      expect(state.currentIndex).toBe(2);
    });

    it('unwraps { track } entries from search results', () => {
      const hits = [{ track: songA }, { track: songB }];
      const fromSearch = reducer(initial, setActiveSong({ song: songA, data: { tracks: { hits } }, i: 0 }));
      expect(reducer(fromSearch, nextSong(1)).activeSong).toEqual(songB);
      expect(reducer(fromSearch, prevSong(1)).activeSong).toEqual(songB);
    });
  });

  it('playPause sets isPlaying', () => {
    expect(reducer(initial, playPause(true)).isPlaying).toBe(true);
    expect(reducer(initial, playPause(false)).isPlaying).toBe(false);
  });

  it('selectGenreListId stores the genre', () => {
    expect(reducer(initial, selectGenreListId('POP')).genreListId).toBe('POP');
  });
});
