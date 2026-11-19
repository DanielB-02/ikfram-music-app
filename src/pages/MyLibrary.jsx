import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';

import { SongCard } from '../components';

const MyLibrary = ({ favoriteSongs }) => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">My Library</h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        <AnimatePresence>
          {favoriteSongs?.map((song, i) => (
            <motion.div
              key={song.key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              layout
            >
              <SongCard
                key={song.key}
                song={song}
                isPlaying={isPlaying}
                activeSong={activeSong}
                data={favoriteSongs}
                i={i}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MyLibrary;
