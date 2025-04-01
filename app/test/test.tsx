'use client';
import * as React from 'react';
import { AppProps } from 'next/app';
import Navbar from '../../components/Navbar';
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
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { FaSearch, FaBars } from 'react-icons/fa';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ButtonGroup from '@mui/material/ButtonGroup';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function CreateFlashcard() {
  const [pageCount, setPageCount] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  // const [frontText, setFrontText] = useState('Front');
  // const [backText, setBackText] = useState('Back');

  type Flashcard = {
    frontText: string;
    backText: string;
    imageUrl: string | null;
    videoUrl: string | null;
    audioUrl: string | null;
    status: 'text' | 'photo' | 'video' | 'audio';
  };
  
  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    { frontText: "Front", backText: "Back", imageUrl: null, videoUrl: null, audioUrl: null, status: 'text' }
  ]);

  // const [flashcards, setFlashcards] = useState([
  //   { frontText: "Front", backText: "Back", imageUrl: null, videoUrl: null, audioUrl: null, status: 'text' }
  // ]);

  const detectFlashcardStatus = (flashcard: Flashcard): 'text' | 'photo' | 'video' | 'audio' => {
    if (flashcard.imageUrl) return 'photo';
    if (flashcard.videoUrl) return 'video';
    if (flashcard.audioUrl) return 'audio';
    return 'text'; // Default to text if no media exists
  };
  

  const updateFlashcard = (key: string, value: string | null) => {
    setFlashcards((prev) => {
      const updatedFlashcards = [...prev];
      updatedFlashcards[currentPage] = { ...updatedFlashcards[currentPage], [key]: value };
      return updatedFlashcards;
    });
  };

  const addNewFlashcard = () => {
    setFlashcards([...flashcards, { frontText: "Front", backText: "Back", imageUrl: null, videoUrl: null, audioUrl: null, status: 'text' }]);
    // setCurrentPage(flashcards.length); 
    setPageCount(pageCount + 1);
  };
  
  const moveLeftCurrentPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => {
        const newPage = prev - 1;
        setStatus(detectFlashcardStatus(flashcards[newPage])); // Auto-set status
        return newPage;
      });
    };
  };
  
  const moveRightCurrentPage = () => {
    setCurrentPage((prev) => {
      const newPage = prev + 1;
      setStatus(detectFlashcardStatus(flashcards[newPage])); // Auto-set status
      return newPage;
    });
  };
  

  const [status, setStatus] = useState('text');

  const [fileName, setFileName] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [videoUrl, setVideoUrl] = React.useState<string | null>(null);
  const [audioUrl, setAudioUrl] = React.useState<string | null>(null);

  // Handle file change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
  
    if (selectedFile) {
      const fileType = selectedFile.type;
      const fileUrl = URL.createObjectURL(selectedFile);
  
      setError(null);
      setFileName(selectedFile.name);
  
      if (status === 'photo' && fileType.startsWith('image/')) {
        setImageUrl(fileUrl);
        updateFlashcard("imageUrl", fileUrl);  // ✅ Update flashcard
      } else if (status === 'video' && fileType.startsWith('video/')) {
        setVideoUrl(fileUrl);
        updateFlashcard("videoUrl", fileUrl);  // ✅ Update flashcard
      } else if (status === 'audio' && fileType.startsWith('audio/')) {
        setAudioUrl(fileUrl);
        updateFlashcard("audioUrl", fileUrl);  // ✅ Update flashcard
      } else {
        setError(`Please select a valid ${status} file.`);
      }
    }
  };

  

 
  
  return (
    <div className="relative bg-white overflow-hidden mx-auto shadow-lg min-h-screen">
      {/* Header */}
      {/* <header className="flex justify-between items-center px-4 py-2 border-b border-blue-800">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
          <h1 className="font-bold text-gray-900 text-lg">MEMORA</h1>
        </div>
        <div className="flex items-center gap-4">
          <FaSearch className="text-black text-lg" />
          <FaBars className="text-black text-lg" />
        </div>
      </header> */}
      <Navbar2 />

      {/* Title */}
      <h2 className="text-center text-3xl font-extrabold text-gray-900 my-4">Decks 03</h2>

      {/* Flashcard */}
      <div className="mx-auto w-[346px] h-[418px] border border-black rounded-2xl overflow-hidden">
        <div className="h-[213px] bg-gray-400 flex items-center justify-center text-3xl font-bold text-gray-900">
          <TextField
              variant="outlined"
              multiline
              fullWidth
              value={flashcards[currentPage]?.frontText || "Front"}
              onChange={(e) => updateFlashcard("frontText", e.target.value)}
              inputProps={{ className: "text-3xl font-bold text-gray-900 text-center" }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none',  // Removes the border
                  },
                },
              }}
            />
        </div>
        {/* show image/video/audio */}
        <div className="h-[205px] bg-white flex items-center justify-center text-3xl font-bold text-black">
          {
            (() => {
              switch (status) {
                case 'photo':
                  return (
                    <>
                      {flashcards[currentPage]?.imageUrl && (
                        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                          <Image
                            src={flashcards[currentPage]?.imageUrl}
                            alt="Uploaded Image"
                            // objectFit='contain'
                            fill={true}
                            style={{
                              objectFit: 'contain',  // Ensures the image stays within the div's bounds
                              maxWidth: '100%',      // Prevents the image from exceeding the container's width
                              maxHeight: '100%',     // Prevents the image from exceeding the container's height
                            }}
                          />
                        </Box>
                      )}

                    </>
                  );
                case 'video':
                  return (
                    <>
                      {flashcards[currentPage]?.videoUrl && (
                        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                          <video
                            src={flashcards[currentPage]?.videoUrl}
                            controls // Adds play, pause, volume, and fullscreen controls to the video
                            style={{
                              objectFit: 'contain',  // Ensures the video fits within the div while maintaining aspect ratio
                              maxWidth: '100%',      // Prevents the video from exceeding the container's width
                              maxHeight: '100%',     // Prevents the video from exceeding the container's height
                            }}
                          />
                        </Box>
                      )}
                    </>
                  );
                case 'audio':
                  return (
                    <>
                      {flashcards[currentPage]?.audioUrl && (
                        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                          <audio controls>
                            <source src={flashcards[currentPage]?.audioUrl} />
                            Your browser does not support the audio element.
                          </audio>
                        </Box>
                      )}
                    </>
                  );
                case 'text':
                  return <TextField
                  variant="outlined"
                  multiline
                  fullWidth
                  value={flashcards[currentPage]?.backText || "Back"}
                  onChange={(e) => updateFlashcard("backText", e.target.value)}
                  inputProps={{ className: "text-3xl font-bold text-black text-center" }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none',  
                        },
                      },
                    }}
                  />;
              }
            })()
          }
          
        </div>
      </div>
      {/* Upload buttons */}
      <div className="mx-auto  overflow-hidden">
        <div className=" bg-white flex items-center justify-center text-3xl font-bold text-black">
          {
            (() => {
              switch (status) {
                case 'photo':
                  return (
                    <>
                      <Button
                        component="label"
                        variant="contained"
                        startIcon={<PhotoIcon />}
                        aria-label="Upload image"
                        sx={{ marginBottom: 2 }}
                      >
                        Upload image
                        <VisuallyHiddenInput 
                          type="file"
                          accept="image/*" // Restrict file selection to images
                          onChange={handleFileChange}
                          multiple={false} // Allow only one file to be selected at a time
                        />
                      </Button>
                      {fileName ? (
                        <Typography variant="body2" color="textSecondary">
                          Selected file: {fileName}
                        </Typography>
                      ) : null}                            
                      {error && (
                        <Typography variant="body2" color="error">
                          {error}
                        </Typography>
                      )}

                    </>
                  );
                case 'video':
                  return (
                    <>
                      <Button
                        component="label"
                        variant="contained"
                        startIcon={<VideoLibraryIcon />}
                        aria-label="Upload video"
                        sx={{ marginBottom: 2 }}
                      >
                        Upload video
                        <VisuallyHiddenInput 
                          type="file"
                          accept="video/*" // Restrict file selection to images
                          onChange={handleFileChange}
                          multiple={false} // Allow only one file to be selected at a time
                        />
                      </Button>
                      {fileName ? (
                        <Typography variant="body2" color="textSecondary">
                          Selected file: {fileName}
                        </Typography>
                      ) : null}                            
                      {error && (
                        <Typography variant="body2" color="error">
                          {error}
                        </Typography>
                      )}

                    </>
                  );
                case 'audio':
                  return (
                    <>
                      <Button
                        component="label"
                        variant="contained"
                        startIcon={<KeyboardVoiceIcon />}
                        aria-label="Upload audio"
                        sx={{ marginBottom: 2 }}
                      >
                        Upload audio
                        <VisuallyHiddenInput 
                          type="file"
                          accept="audio/*" // Restrict file selection to images
                          onChange={handleFileChange}
                          multiple={false} // Allow only one file to be selected at a time
                        />
                      </Button>
                      {fileName ? (
                        <Typography variant="body2" color="textSecondary">
                          Selected file: {fileName}
                        </Typography>
                      ) : null}                            
                      {error && (
                        <Typography variant="body2" color="error">
                          {error}
                        </Typography>
                      )}

                    </>
                  );
              }
            })()
          }
          
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-6 ">
        <Button variant="text" sx={{ border: '1px solid black', width: '40px', height: '40px' }} onClick={() =>{
          setStatus('text'); 
          setFileName(null); 
          setError(null); 
          setImageUrl(null); 
          setVideoUrl(null);
        }}>
          <TitleIcon />
        </Button>
        <Button variant="text" sx={{ border: '1px solid black', width: '40px', height: '40px' }} onClick={() =>{
          setStatus('photo'); 
          setFileName(null); 
          setError(null); 
          setImageUrl(null); 
          setVideoUrl(null);
        }}>
          <PhotoIcon />
        </Button>
        <Button variant="text" sx={{ border: '1px solid black', width: '40px', height: '40px' }} onClick={() =>{
          setStatus('video'); 
          setFileName(null); 
          setError(null); 
          setImageUrl(null); 
          setVideoUrl(null);
        }}>
          <VideoLibraryIcon />
        </Button>
        <Button variant="text" sx={{ border: '1px solid black', width: '40px', height: '40px' }} onClick={() =>{
          setStatus('audio'); 
          setFileName(null); 
          setError(null); 
          setImageUrl(null); 
          setVideoUrl(null);
        }}>
          <KeyboardVoiceIcon />
        </Button>
      </div>
      {/* <ButtonGroup  variant="outlined" aria-label="outlined button group"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 4,
        marginTop: 6
      }}>
        <Button  sx={{  width: '40px', height: '40px' }}>
          <TitleIcon />
        </Button>
        <Button  sx={{  width: '40px', height: '40px' }}>
          <PhotoIcon />
        </Button>
        <Button  sx={{  width: '40px', height: '40px' }}>
          <VideoLibraryIcon />
        </Button>
        <Button  sx={{  width: '40px', height: '40px' }}>
          <KeyboardVoiceIcon />
        </Button>
      </ButtonGroup> */}

      {/* Navigation */}
      <div className="flex justify-center items-center mt-6 gap-8">
        <Button variant="contained">
          <WestIcon onClick={moveLeftCurrentPage}/>
        </Button>
        {/* <Typography variant="h4"  className="font-bold">
          {currentPage}/{pageCount}
        </Typography> */}
        <span className="text-2xl font-bold">{currentPage}/{pageCount}</span>
        {currentPage === pageCount ? (
          <Button variant="contained">
            <AddIcon onClick={addNewFlashcard} />
          </Button>
        ) : (
          <Button variant="contained">
            <EastIcon onClick={moveRightCurrentPage} />
          </Button>
        )}
      </div>
    </div>
  );
}
