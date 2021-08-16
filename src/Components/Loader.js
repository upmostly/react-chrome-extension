import React, { useState, useEffect } from 'react';
import { X } from 'react-feather';
import Draggable from 'react-draggable';
import { HotKeys } from "react-hotkeys";
import { ModalContext } from '../Contexts/ModalProvider';
import Button from '../Components/Button';
import Metadata from '../Components/Metadata';
import Image from '../Components/Image';
import Search from '../Components/Search';
import Hotkeys from 'react-hot-keys';
import classes from '../App.module.css';

const fetch = require('node-fetch');
const og = require('open-graph');

const Loader = (props) => {
  const [visable, setVisable] = useState(true);
  const [upload, setUpload] = useState({ status: true, data: null });

  const handleCloseModal = () => {
    setVisable(false)
  }

  const onLoadHover = () => {
    console.log('hovering now')
  }

  const handleKeydown = (e) => {
    console.log('this is the key press event from loader', e)
  }

  useEffect(() => {
    console.log(upload.status)
    if(!upload.status) {
      console.log('starting timer')
      const timer = setTimeout(() => {
        console.log('This will run after 3 second!')
        handleCloseModal()
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  window.addEventListener("message", function(event) {
    if(event.data.type === "UPLOAD_DONE") {
      console.log('this is the data from the upload', event)
      setUpload({ status: false })
    }
  });

  let count = 25;
  let title = document.title.slice(0, count) + (document.title.length > count ? "..." : "");

  const loaderClose = () => {
    setVisable(false)
  }

  function FooterUploading(props) {
    return (
      <>
        <div className={classes.loaderFooterLeft}>Saving...</div>
      </>
    );
  }

  function FooterDone(props) {
    return (
      <>
        <div className={classes.loaderFooterLeft}>Saved</div>
        <div className={classes.loaderFooterRight}>
          <a href="#" style={{ color: '#0084FF', fontWeight: '600', textDecoration: 'none' }} target="_blank">
            View
          </a>
        </div>
      </>
    );
  }

  let footer = <FooterUploading />
  if (!upload.status) {
    footer = <FooterDone />;
  }

  return (
    <div className={visable ? classes.loaderFadeIn : classes.loaderFadeOut }>
      <ModalContext.Consumer>
        {({ windowPosition, hasDraggedWindowPosition, extensionId, getExtensionId, pageData }) => (
          <>
          {visable ?
            <div id="modal" className={classes.loaderWindow } onMouseEnter={onLoadHover}>
              <div className={classes.loaderBody}>
                <div className={classes.loaderContent}>
                  <div className={classes.loaderText}>
                    <img className={classes.loaderImage} src={props.image} />
                    {title}
                    <div onClick={loaderClose} className={classes.loaderClose}>X</div>
                  </div>
                  <div className={classes.loaderFooter}>
                    {footer}
                  </div>
                </div>
              </div>
            </div>
          :
            <div></div>
          }
          </>
        )}
      </ModalContext.Consumer>
    </div>
  );
};

export default Loader;
