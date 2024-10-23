'use client'

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

const images = [
  {
    url: '/comodidad.jpeg',
    title: 'comodidad',
    width: '40%',
  },
  {
    url: '/elegante.jpeg',
    title: 'elegancia',
    width: '30%',
  },
  {
    url: '/multiusos.jpeg',
    title: 'multiples usos',
    width: '30%',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 130,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));


export default function ButtonsExtension() {
  return <div className="flex flex-col w-full h-48 sm:h-52 relative">
    <div className="h-1/2 bg-primary"></div> {/* Mitad superior con color primario */}
    <div className="h-1/2 bg-transparent"></div> {/* Mitad inferior sin color */}
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <Box sx={{ 
      display: 'flex',
      flexWrap: 'nowrap',
      minWidth: 450, 
      width: { sm: '700px', lg: '50vw' }, 
      gap: { xs: '0', sm: '10vw' }, 
      justifyContent: 'space-between' 
    }}>
      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            flex:1
          }}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={(theme) => ({
                position: 'relative',
                p: 4,
                pt: 2,
                pb: `calc(${theme.spacing(1)} + 6px)`,
              })}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
    </div>
  </div>

}