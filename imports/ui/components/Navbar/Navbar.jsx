import { Container, Navbar as BNavbar } from 'react-bootstrap';

import './Navbar.css';

/**
 * Component for the navigation bar of the application.
 */
const Navbar = () => {
  return (
    <>
      <Container>
        <BNavbar bg='primary' variant='dark'>
          <Container>
            <BNavbar.Brand className='d-inline-flex' href='/numbers-words'>
              <img
                src='/logo.svg'
                height='30'
                className='d-inline-block align-center white-logo'
                alt='Application logo'
              />
              <strong>Numbers-Words</strong>
            </BNavbar.Brand>
          </Container>
        </BNavbar>
      </Container>
    </>
  );
};

export default Navbar;
