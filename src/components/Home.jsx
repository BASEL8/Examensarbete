import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import image_1 from '../img/1.png'
import image_2 from '../img/2.png'
import image_3 from '../img/3.png'
import image_4 from '../img/4.png'
import programer from '../img/programer.jpeg'
const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: 100
  },
  header: {
    paddingTop: 100,
    minHeight: '90vh',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden'
  },
  headerImage: {
    flex: 1,
    background: `url(${programer}) no-repeat center`,
    backgroundSize: 'cover',
    paddingLeft: 20,
    borderTopLeftRadius: '40%',
    borderBottomLeftRadius: '40%',
    clipPath: 'polygon(30% 0%, 100% 0, 100% 30%, 100% 70%, 100% 100%, 30% 100%, 0% 70%, 0% 30%)'

  },
  headerTitle: {
    fontSize: 30,
    fontFamily: 'Montserrat, sans-serif',
    lineHeight: 2,
    verticalAlign: 'baseline',
    letterSpacing: 'normal',
    wordSpacing: 0
  },
  headerText: {
    width: 400,
    paddingTop: 30,
    fontSize: 15,
    fontFamily: 'Montserrat, sans-serif'
  },
  section: {
  },
  stepMain: {
    padding: '20px 10px',
    marginTop: 20,
    display: 'flex',
    flexWrap: 'wrap'
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
    maxHeight: 300
  },
  link: {
    textDecoration: 'none',
    color: 'white',
  }
}))
let data = [
  {
    title: 'Create an anonymous profile',
    text: 'Create an anonymous profile and state your wishes regarding jobs, salaries and benefits. All that motivates you to change jobs.', image: image_1
  },
  {
    title: 'Get offers & apply anonymously',
    text: 'You will be contacted through specific offers based on your wishes and can apply to specific employers. You see which employers can match your expectations.',
    image: image_2
  },
  { title: 'Take a stand', text: 'Go ahead with the most interesting offers and let employers share your full profile so they can make personal contact.', image: image_3 },
  { title: 'Start the your dream job', text: 'When hiring, Ryktera gives you an employment gift.', image: image_4 }
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
        <img className={classes.stepImage} src={image} alt='e' />
      </div>
    </div>)
}
const Home = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div style={{ padding: 50, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <h2 className={classes.headerTitle}>
            Discover new career opportunities completely anonymously
      </h2>
          <p className={classes.headerText}>
            We match you and your wishes to hundreds of tech companies so that they can contact through personal offers, completely anonymously. Find out which employers are interested in you and can meet your expectations.
      </p>
          <Button variant="contained" color="primary" style={{ marginTop: 30 }}>
            <Link className={classes.link} to={"/user/register"}>Register</Link>
          </Button>
        </div>
        <Hidden smDown><div className={classes.headerImage}></div></Hidden>
      </div>
      {data.map(({ title, text, image }, index) => <Step key={index} index={index} title={title} text={text} image={image} />)}
    </div>
  )
}
export default Home;