import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import NavBar from './components/NavBar'
// eslint-disable-next-line no-unused-vars
import Grid from './components/Grid'
import Footer from './components/Footer'
import './App.css';
import Home from './pages/Home';
import PuzzleDay from './pages/puzzleoftheDay';
import MyPuzzles from './pages/mypuzzles';
import Resources from './pages/Resources';
//changes to imports 
// template for if we want to end up using any of the material ui icons vvv
// import TestIcon from '@material-ui/icons/Test';

const theme = createMuiTheme({
  palette: {
    primary: {
      main:"#2e1667",
    },
    secondary: {
      main:"#c7d8ed",
    },
  },
  typography: {
    fontFamily: [
      'Roboto'
    ],
    h4: {
      fontWeight: 600,
      fontSize: 28,
      lineHeight: '2rem',
      },
    h5: {
      fontWeight: 100,
      lineHeight: '2rem',
    },
  },
});

const styles = makeStyles({
  wrapper: {
    width: "65%",
    margin: "auto",
    textAlign: "center"
  },
  bigSpace: {
    marginTop: "5rem"
  },
  littleSpace:{
    marginTop: "2.5rem",
  },
  grid:{
    display: "flex", 
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap", 
  },
})



const client = new ApolloClient({
  request: operation =>{
    const token = localStorage.getItem('id_token');
    operation.setContext({
      headers:{
        authorization: token ? `Bearer ${token}`  : ''
      }
    });
  },
  uri:'/graphql'
});


function App() {
  const classes = styles(); 

  return (
    <ApolloProvider client={client}>
    <Router>
    <div className="App">
      <ThemeProvider theme={theme}>
        <NavBar/>
        <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/puzzleoftheday" element={<PuzzleDay/>} />
        <Route exact path="/mypuzzles" element={<MyPuzzles/>} />
        <Route exact path="/resources" element={<Resources/>} />
        <Route path = "*" element={<Home/>} /> 
        </Routes>
        {/* demo of what we can use for icons if we want for the grid */}
        {/* <div className={`${classes.grid} ${classes.bigSpace}`}>
          <Grid icon={<SecurityIcon style={{fill: "#4360A6", height:"125", width:"125"}}/>}  title="Secure" btnTitle="Show me More" />
          <Grid icon={<EventNoteIcon style={{fill: "#449A76", height:"125", width:"125"}}/>} title="Reliable" btnTitle="Show me More"/>
          <Grid icon={<TrendingUpIcon style={{fill: "#D05B2D", height:"125", width:"125"}}/>}  title="Performant" btnTitle="Show me More"/>
        </div>
        <div className={`${classes.grid} ${classes.littleSpace}`}>  
          <Grid icon={<ImportExportIcon style={{fill: "#5EA780", height:"125", width:"125"}}/>}  title="Modular" btnTitle="Show me More"/>
          <Grid icon={<ComputerIcon style={{fill: "#E69426", height:"125", width:"125"}}/>}  title="Multi-Platform" btnTitle="Show me More"/>
          <Grid icon={<HttpIcon style={{fill: "#2EA09D", height:"125", width:"125"}}/>} title="Connected" btnTitle="Show me More"/>
        </div> */}
        <div className={classes.bigSpace}>
          <Footer/>
        </div>
      </ThemeProvider>
  </div>
  </Router>
  </ApolloProvider>
  )};

export default App;
