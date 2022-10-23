import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Button, Card, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';

import './NumbersWordsForm.css';

/**
 * Component for the input form (range of numbers) of the application.
 *
 * @param {Function} setNumbersWordsInput The callback function that updates the data from the input form component.
 */
const NumbersWordsForm = ({ setNumbersWordsInput }) => {
  const {
    control,
    trigger,
    formState: { touchedFields, errors, isDirty, isValid },
    handleSubmit,
    getValues,
  } = useForm({
    defaultValues: {
      min: '',
      max: '',
    },
    mode: 'onChange',
  });

  /**
   * Function that is a custom validation for the maximum value of the provided range.
   *
   * @returns {Boolean} True if maximum value is valid, false otherwise.
   */
  const maxValidation = (value) => {
    const min = Number(getValues('min'));
    return min && Number(value) >= min;
  };

  /**
   * Function that is a custom validation for the minimum value of the provided range.
   *
   * @returns {Boolean} True if minimum value is valid, false otherwise.
   */
  const minValidation = (value) => {
    const max = Number(getValues('max'));
    return max && Number(value) <= max;
  };

  /**
   * Function that updates the data from the input form.
   *
   * @param {Object} data The data from the input from.
   */
  const getNumbersWords = (data) => {
    setNumbersWordsInput({
      range: {
        min: Number(data.min),
        max: Number(data.max),
      },
      isValid: isValid,
    });
  };

  return (
    <>
      <Container>
        <Row className='justify-content-md-center pt-4'>
          <Col md='auto'>
            <Card>
              <Card.Header className='bg-primary text-white'>
                Please, provide a valid range of integer positive numbers. Ex: 1-100
              </Card.Header>
              <Card.Body>
                <Form noValidate onSubmit={handleSubmit(getNumbersWords)}>
                  <Form.Group className='md-4' controlId='minFormGroup'>
                    <FloatingLabel controlId='minForm' label='Minimum' className='mb-3'>
                      <Controller
                        name='min'
                        control={control}
                        rules={{
                          pattern: /^\+?(0|[1-9]\d*)$/,
                          min: 1,
                          validate: minValidation,
                          required: true,
                        }}
                        render={({ field }) => (
                          <Form.Control
                            {...field}
                            type='number'
                            placeholder='Minimum'
                            isInvalid={!!errors.min}
                            isValid={
                              !errors.min &&
                              !!touchedFields.min &&
                              getValues('min') !== ''
                            }
                            onKeyUp={() => trigger()}
                          />
                        )}
                      />
                      {errors.min?.type == 'pattern' && (
                        <Form.Control.Feedback type='invalid'>
                          Minimum value must be an integer
                        </Form.Control.Feedback>
                      )}
                      {errors.min?.type == 'min' && (
                        <Form.Control.Feedback type='invalid'>
                          Minimum value is 1
                        </Form.Control.Feedback>
                      )}
                      {errors.min?.type == 'validate' && (
                        <Form.Control.Feedback type='invalid'>
                          Minimum value has to be less or equals than maximum value
                        </Form.Control.Feedback>
                      )}
                      {errors.min?.type == 'required' && (
                        <Form.Control.Feedback type='invalid'>
                          Minimum value is required
                        </Form.Control.Feedback>
                      )}
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group as={Col} className='md-4' controlId='maxFormGroup'>
                    <FloatingLabel controlId='maxForm' label='Maximum' className='mb-3'>
                      <Controller
                        name='max'
                        control={control}
                        rules={{
                          pattern: /^\+?(0|[1-9]\d*)$/,
                          min: 1,
                          validate: maxValidation,
                          required: true,
                        }}
                        render={({ field }) => (
                          <Form.Control
                            {...field}
                            type='number'
                            placeholder='Maximum'
                            isInvalid={!!errors.max}
                            isValid={
                              !errors.max &&
                              !!touchedFields.max &&
                              getValues('max') !== ''
                            }
                            onKeyUp={() => trigger()}
                          />
                        )}
                      />
                      {errors.max?.type == 'pattern' && (
                        <Form.Control.Feedback type='invalid'>
                          Maximum value has to be an integer
                        </Form.Control.Feedback>
                      )}
                      {errors.max?.type == 'min' && (
                        <Form.Control.Feedback type='invalid'>
                          Maximum value is 1
                        </Form.Control.Feedback>
                      )}
                      {errors.max?.type == 'validate' && (
                        <Form.Control.Feedback type='invalid'>
                          Maximum value has to be greater or equals than minimum value
                        </Form.Control.Feedback>
                      )}
                      {errors.max?.type == 'required' && (
                        <Form.Control.Feedback type='invalid'>
                          Maximum value is required
                        </Form.Control.Feedback>
                      )}
                    </FloatingLabel>
                  </Form.Group>
                  <Button
                    className='w-100'
                    type='submit'
                    variant='primary'
                    disabled={!isDirty || !isValid}
                  >
                    Generate
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NumbersWordsForm;
