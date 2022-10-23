import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Navbar from '../Navbar/Navbar.jsx';
import Toast from '../Toast/Toast.jsx';
import NumbersWordsForm from '../NumbersWordsForm/NumbersWordsForm.jsx';
import NumbersWordsList from '../NumbersWordsList/NumbersWordsList.jsx';

import './App.css';

/**
 * Component for the application root.
 */
const App = () => {
  const [message, setMessage] = useState('');
  const [numbersWordsInput, setNumbersWordsInput] = useState({
    range: {
      min: '',
      max: '',
    },
    isValid: false,
  });

  return (
    <Container fluid>
      <Navbar></Navbar>
      <Container fluid>
        <Toast message={message} setMessage={setMessage}></Toast>
        <Router>
          <Switch>
            <Route exact path='/numbers-words'>
              <NumbersWordsForm setNumbersWordsInput={setNumbersWordsInput} />
              <NumbersWordsList
                numbersWordsInput={numbersWordsInput}
                setNumbersWordsInput={setNumbersWordsInput}
                setMessage={setMessage}
              />
            </Route>
            <Route
              path='/*'
              render={() => {
                return <Redirect to={'/numbers-words'} />;
              }}
            />
          </Switch>
        </Router>
      </Container>
    </Container>
  );
};

export default App;
