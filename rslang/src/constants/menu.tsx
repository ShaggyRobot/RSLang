import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import BarChartIcon from '@mui/icons-material/BarChart';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SpatialAudioIcon from '@mui/icons-material/SpatialAudio';

export const navMenu = [
  { name: 'Home', path: '/', icon: <HomeIcon color='primary' /> },
  { name: 'About', path: '/about', icon: <InfoIcon color='primary' /> },
  { name: 'Textbook', path: '/textbook', icon: <AutoStoriesIcon color='primary' /> },
  { name: 'Statistics', path: '/statistics', icon: <BarChartIcon color='primary' /> },
  { name: 'Sprint Game', path: '/sprint', icon: <SportsEsportsIcon color='primary' /> },
  { name: 'Audiocall', path: '/audiocall', icon: <SpatialAudioIcon color='primary' /> },
];
