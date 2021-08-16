import React, { useState, useEffect } from 'react';
import './App.css';
import Modal from './Components/Modal';
import Loader from './Components/Loader';
import ModalProvider from './Contexts/ModalProvider';
import Hotkeys from 'react-hot-keys';

function App() {
  const [isOpened, setIsOpened] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [og, setOg] = useState({ image: null, title: null });

  function onKeyUp(keyName, e, handle) {
    console.log("test:onKeyUp", e, handle)
  }

  function onKeyDown(keyName, e, handle) {
    console.log("test:onKeyDown", keyName)

    if(keyName == 'esc') {
      setIsOpened(false)
    }

    if(keyName == 'alt+b') {
      console.log('save a bookmark')
    }
  }

  window.addEventListener("message", function(event) {
    console.log('there is a message in the app')
    if(event.data.type === "UPLOAD_START") {
      setIsOpened(false)
      setIsUploading(true)
    }

    if(event.data.type === "CLOSE_APP") {
      setIsOpened(false)
    }

    if(event.data.type === "OPEN_LOADING") {
      setIsOpened(false)
      setIsUploading(true)
    }
  });

  useEffect(() => {
    let imageMeta = getMeta();
    setOg({ image: imageMeta })
  }, []);

  function getMeta() {
    let image;
    if(document.querySelector("meta[property='og:image']")){
      image = document.querySelector("meta[property='og:image']").getAttribute('content');
    } else {
      let first = document.getElementsByTagName("img")[1];
      console.log('first', first)
      image = first.src;
    }
    return image;
  }

  console.log('isOpened: ', isOpened)

  return (
    <>
      {isOpened &&
        <ModalProvider>
          <div>
            <Hotkeys 
              keyName="alt+s,esc,alt+b" 
              onKeyDown={onKeyDown.bind(this)}
              onKeyUp={onKeyUp.bind(this)}
            >
              <Modal
                image={og.image}
              />
            </Hotkeys>
          </div>
        </ModalProvider>
      }
      {isUploading &&
        <Loader 
          image={og.image}
        />
      }
    </>
  );
}

export default App;
