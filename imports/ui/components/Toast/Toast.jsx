import { ToastContainer, Toast as BToast } from 'react-bootstrap';

import './Toast.css';

/**
 * Component to display messages to the user.
 *
 * @param {String} message The message to display to the user.
 * @param {Function} setMessage The callback function that updates the message to displayed to the user.
 */
const Toast = ({ message, setMessage }) => {
  /**
   * Callback function that is executed when the Toast component is closed.
   */
  const onClose = () => {
    setMessage('');
  };

  /**
   * Function that shows or hides the Toast component to the user.
   *
   * @returns {Boolean} True if is there any message to show, false otherwise.
   */
  const onShow = () => {
    return message !== '' ? true : false;
  };

  return (
    <>
      <ToastContainer className='mb-5' position='bottom-center'>
        <BToast onClose={onClose} show={onShow()} delay={5000} autohide bg='light'>
          <BToast.Header className='bg-primary text-white'>
            <img
              src='/logo-short.png'
              height='10'
              className='rounded me-2 white-logo'
              alt='Application logo'
            />
            <strong className='me-auto'>Numbers-Words</strong>
            <small>now</small>
          </BToast.Header>
          <BToast.Body>{message}</BToast.Body>
        </BToast>
      </ToastContainer>
    </>
  );
};

export default Toast;
