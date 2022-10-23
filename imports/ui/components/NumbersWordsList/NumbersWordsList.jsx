import { Meteor } from 'meteor/meteor';

import React, { useState, useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';

import Pagination, { defaultItemsPerPage } from '../Pagination/Pagination.jsx';

import './NumbersWordsList.css';

/**
 * Component to display the output data (numbers-words) of the application.
 *
 * @param {Object} numbersWordsInput The data from the input form component.
 * @param {Function} setNumbersWordsInput The callback function that updates the data from the input form component.
 * @param {Function} setMessage The callback function that updates the message to displayed to the user.
 */
const NumbersWordsList = ({ numbersWordsInput, setNumbersWordsInput, setMessage }) => {
  const [initialRange, setInitialRange] = useState(null);
  const [numbersWordsOutput, setNumbersWordsOutput] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (numbersWordsInput.isValid) {
      // check if the range of numbers has changed and reset the list
      const min = numbersWordsInput.range.min;
      const max = numbersWordsInput.range.max;
      if (!initialRange) {
        setInitialRange(numbersWordsInput.range);
      } else if (initialRange.min !== min || initialRange.max !== max) {
        setInitialRange(numbersWordsInput.range);
        setCurrentPage(1);
      }

      // call function and get the words for each one of numbers of the range
      Meteor.call('getNumbersWords', getCurrentRange(), (err, res) => {
        // if there is any error on the server, show it to the user and reset the list
        if (err && err.error) {
          setMessage(err.reason);
          setNumbersWordsInput({
            range: numbersWordsInput.range,
            isValid: false,
          });
          setNumbersWordsOutput([]);
          setCurrentPage(1);
        } else {
          setMessage('');
          setNumbersWordsOutput(res);
        }
      });
    }
  }, [numbersWordsInput, currentPage]);

  /**
   * Returns the current range of numbers (minimum and maximum value) based to the current page.
   *
   * @returns The current range of numbers.
   */
  const getCurrentRange = () => {
    let pageRange = numbersWordsInput.range;
    if (
      numbersWordsInput.range.max - numbersWordsInput.range.min + 1 >
      defaultItemsPerPage
    ) {
      const min = numbersWordsInput.range.min + (currentPage - 1) * defaultItemsPerPage;
      const max =
        min + defaultItemsPerPage > numbersWordsInput.range.max
          ? numbersWordsInput.range.max
          : min + defaultItemsPerPage - 1;
      pageRange = {
        min,
        max,
      };
    }
    return pageRange;
  };

  return (
    <>
      {numbersWordsInput.isValid ? (
        <Container className='pt-4'>
          <Card>
            <Card.Header className='bg-primary text-white'>
              Provided range: {numbersWordsInput.range.min}-{numbersWordsInput.range.max}
            </Card.Header>
            <Card.Body className='d-flex gap-3 flex-wrap justify-flex-start'>
              {numbersWordsOutput.map((numberWord) => (
                <Card key={numberWord.number} className='number-word-item-card'>
                  <Card.Header className='bg-primary text-center text-white'>
                    {numberWord.number}
                  </Card.Header>
                  <Card.Body className='text-center'>
                    <Card.Text>{numberWord.word}</Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </Card.Body>
          </Card>
          <Pagination
            itemsCount={numbersWordsInput.range.max - numbersWordsInput.range.min + 1}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Container>
      ) : null}
    </>
  );
};

export default NumbersWordsList;
