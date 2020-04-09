import React from 'react';
import './App.css';
import Modal from './Components/Modal';
import ModalProvider from './Contexts/ModalProvider';

/**
 * @return {null}
 */
function App() {
  return (
    <ModalProvider>
      <Modal />
    </ModalProvider>
  );
}

export default App;
