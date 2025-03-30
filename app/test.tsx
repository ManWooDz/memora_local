// pages/_app.tsx
'use client'
import { AppProps } from 'next/app';
import Navbar from '../components/Navbar';
import Navbar2 from '@/components/Navbar2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TitleIcon from '@mui/icons-material/Title';
import PhotoIcon from '@mui/icons-material/Photo';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import Box from '@mui/material/Box';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import Typography from '@mui/material/Typography';



const MyApp = ({ Component, pageProps }: AppProps) => {
  const [pageCount, setPageCount] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  const addTotalPage = () => {
    setPageCount(pageCount + 1);
  };
  const moveLeftCurrentPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const moveRightCurrentPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // console.log('currentPage', currentPage);
  return (
    <>
      <Navbar2 />
      <Box component="section" sx={{ p: 2, border: '1px black solid', display: 'flex', justifyContent: 'center', alignItems: 'center', width: 1/6 }}>
        <Button variant="text">
          <TitleIcon />
        </Button>
        <Button variant="text">
          <PhotoIcon />
        </Button>
        <Button variant="text">
          <VideoLibraryIcon />
        </Button>
        <Button variant="text">
          <KeyboardVoiceIcon />
        </Button>
      </Box>
      <Box component="section" sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', width: 1/6 }}>
        <Button variant="contained">
          <WestIcon onClick={moveLeftCurrentPage}/>
        </Button>
        <Typography variant="h4" gutterBottom>
          {currentPage}/{pageCount}
        </Typography>
        {currentPage === pageCount ? (
          <Button variant="contained">
            <AddIcon onClick={addTotalPage} />
          </Button>
        ) : (
          <Button variant="contained">
            <EastIcon onClick={moveRightCurrentPage} />
          </Button>
        )}
      </Box>
    </>
  );
};

export default MyApp;
