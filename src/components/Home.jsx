import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import FlareSharpIcon from '@material-ui/icons/FlareSharp';
import Hidden from '@material-ui/core/Hidden';
import Typing from 'react-typing-animation';
import {Man,Search,Girl,Start,TalentSvg} from '../img'

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: 100
  },
  header: {
    minHeight: '35vh',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    background: theme.palette.primary.main,
    color: theme.palette.text.light
  },
  headerImage: {
    flex: 1,
    backgroundSize: 'cover',
    paddingLeft: 20,
    borderTopLeftRadius: '40%',
    borderBottomLeftRadius: '40%',
    clipPath: 'polygon(30% 0%, 100% 0, 100% 30%, 100% 70%, 100% 100%, 30% 100%, 0% 70%, 0% 30%)'

  },
  headerTitle: {
    fontSize: 40,
    fontFamily: 'Montserrat, sans-serif',
    lineHeight: 2,
    verticalAlign: 'baseline',
    letterSpacing: 'normal',
    wordSpacing: 0
  },
  headerText: {
    maxWidth: 500,
    paddingTop: 30,
    fontSize: 15,
    fontFamily: 'Montserrat, sans-serif'
  },
  mainText: {
    marginTop:100,
    marginBottom:100,
    padding: 30,
    textAlign: 'center',
    color: '#333333',
    fontSize: 24,
  },
  section: {
  },
  stepMain: {
    padding: '20px 10px',
    marginTop: 20,
    display: 'flex',
    flexWrap: 'wrap'
  },
  buttonHolder: {
    background: theme.palette.primary.dark,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    '& button': {
      background: theme.palette.primary.button
    }
  },
  TextHolder: {
    flex: 1,
    minWidth: 300,
    padding: '50px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  step: {
    color: '#5386ff',
    fontWight: 700,
    paddingTop: 10,
    fontSize: 18,
    lineHeight: 5,
    verticalAlign: 'baseline',
    letterSpacing: 'normal',
    wordSpacing: 0,
    textTransform: 'uppercase'
  },
  stepSpan: {
    background: '#EDF3FF',
    borderRadius: 4,
    padding: '10px 15px',
    position: 'relative',
    zIndex: -10,
    left: -7,
    color: '#5386ff',
    fontWight: 700,
    paddingTop: 10,
    fontSize: 18,
    lineHeight: 5,
    verticalAlign: 'baseline',
    letterSpacing: 'normal',
    wordSpacing: 0,
    textTransform: 'uppercase'
  },
  stepTitle: {
    fontWeight: 400,
    fontSize: 33,
    marginBottom: 20
  },
  imageHolder: {
    height: 300,
    flex: 1,
    padding: '50px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  stepImage: {
    maxHeight: 350,
    '& svg': {
      maxHeight: 350,
    }
  },
  link: {
    textDecoration: 'none',
    color: 'white',
  }
}))
let data = [
  {
    title: 'Create an anonymous profile',
    text: 'Create an anonymous profile and state your wishes regarding jobs, salaries and benefits. All that motivates you to change jobs.', image: <Search/>
  },
  {
    title: 'Get offers & apply anonymously',
    text: 'You will be contacted through specific offers based on your wishes and can apply to specific employers. You see which employers can match your expectations.',
    image: <Girl/>
  },
  { title: 'Take a stand', text: 'Go ahead with the most interesting offers and let employers share your full profile so they can make personal contact.', image: <Man/> },
  { title: 'Start the your dream job', text: 'When hiring, Ryktera gives you an employment gift.', image: <Start/> }
];
const Step = ({ title, text, image, index }) => {
  const classes = useStyles();
  return (
    <div className={classes.stepMain} style={{ flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' }}>
      <div className={classes.TextHolder}>
        <div style={{ maxWidth: 450 }}>
          <div style={{ alignSelf: 'flex-start' }}>
            <span className={classes.step}>
              step
        </span>
            <span className={classes.stepSpan}>{index + 1}</span>
          </div>
          <p className={classes.stepTitle}>
            {title}
          </p>
          <div>
            {text}
          </div>

        </div>
      </div>
      <div className={classes.imageHolder}>
        <div className={classes.stepImage}>{image}</div>
      </div>
    </div>)
}



const Home = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div style={{ padding: 50, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <TalentSvg/>
          <h2 className={classes.headerTitle}>
            Discover new career opportunities completely anonymously
            </h2>
          <div style={{ display: 'flex' }}>
            <h3 style={{marginRight:5}}>For</h3>
            <Typing speed={80} loop>
              {['DevOps','Programers','Testers','UI&UX Designer','Everyone who works in IT'].map((text,index) => { 
                return <Fragment key={index}>
                <h3 style={{color:'gold'}}>{text}.</h3> 
                 <Typing.Backspace delay={1200} count={text.length + 2} />
                 </Fragment>
              })}
              <Typing.Reset/>
          </Typing>
          </div>
     
        </div>
        <Hidden xlDown><div className={classes.headerImage}></div></Hidden>
      </div>
      
      <div className={classes.buttonHolder}>
        <Button variant="contained" size="large" >
          <Link className={classes.link} to={"/user/register"}>Register</Link>
          <ArrowRightAltIcon className={classes.link} />
        </Button>
      </div>
      <p className={classes.mainText}>
            We match you and your wishes to hundreds of tech companies so that they can contact through personal offers, completely anonymously.
          Find out which employers are interested in you and can meet your expectations.
          </p>
      {data.map(({ title, text, image }, index) => <Step key={index} index={index} title={title} text={text} image={image} />)}
    </div>
  )
}
export default Home;