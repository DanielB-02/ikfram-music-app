import {motion, AnimatePresence} from 'framer-motion'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {SongCard } from '../components';


const MyLibrary = ({ favoriteSongs }) => {
  const dispatch = useDispatch();
  const { genreListId } = useSelector((state) => state.player);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  return (

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
  );
};

export default MyLibrary;
