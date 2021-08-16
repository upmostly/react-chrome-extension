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

function onKeyUp(keyName, e, handle) {
  console.log("test:onKeyUp", e, handle)
}
function onKeyDown(keyName, e, handle) {
  console.log("test:onKeyDown", keyName, e, handle)
}

const Modal = (props) => {
  const [search, setSearch] = useState({ query: null });
  const [loading, setLoading] = useState(false);
  const [og, setOg] = useState({ image: null, title: null });

  const handleSearchChange = async (e) => {
    let checkType = e.target.value.includes("†")
    if(checkType) {
      let final = e.target.value.replace("†", "type:");
      setSearch({ query: final });
      return;
    }

    let checkFrom = e.target.value.includes("ƒ")
    if(checkFrom) {
      let final = e.target.value.replace("ƒ", "from:");
      setSearch({ query: final });
      return;
    }

    setSearch({ query: e.target.value });
  }

  const handleSearch = (e) => {
    console.log('event: ', e)
    if(e.key === "Enter") {
      window.postMessage({ 
        type: "OPEN_SEARCH", 
        query: e.target.value 
      }, "*");
    }

    if(e.key === "Escape") {
      window.postMessage({ 
        type: "CLOSE_APP", 
      }, "*");
    }

    if(e.key === "Escape") {
      window.postMessage({ 
        type: "CLOSE_APP", 
      }, "*");
    }
  }

  const handleCloseModal = () => {
    window.postMessage({ type: "CLOSE_APP" }, "*");
  }

  const onKeyPressed = (e) => {
    console.log(e.key);
  }

  window.addEventListener("message", function(event) {
    console.log('yes an event was called in the modal', event);
    if(event.data.type === "UPLOAD_IMAGE") {
      console.log('uploading image not main')
      //chrome.runtime.sendMessage({ type: 'OPEN_SEARCH', query: event.data.query });
    }
  });

  return (
    <ModalContext.Consumer>
      {({ windowPosition, hasDraggedWindowPosition, extensionId, getExtensionId, pageData }) => (
        <div id="modal" className={classes.modalWindow}>
          <div>
            <div className={classes.modalBody}>
              <div className={classes.modalContent}>
                <div className={classes.modalSearchBar}>
                  <Search />
                  {/* 
                  <input 
                    name="search-input"
                    type="text" 
                    id="search" 
                    style={{ backgroundColor: '#F2F2F7', border: 'none', fontFamily: 'Inter', color: '#8E8E93', outline: 'none' }}
                    className={classes.modalSearchInput}
                    onChange={(e) => {handleSearchChange(e)}}
                    value={search.query}
                    autocomplete="off" 
                    placeholder="Search your Slate..."
                    ref={input => input && input.focus()}
                    onKeyDown={(e) => {handleSearch(e)}}
                    autofocus
                  />
                  */}
                </div>

                <Metadata 
                  url={pageData.url} 
                  title={pageData.title} 
                  image={props.image} 
                />

                <div 
                  style={{ margin: '0 auto', overflow: "auto", width: '352px', height: "162px", borderRadius: '12px'}}
                  className={classes.modalButtonBox}
                >
                  <Button 
                    text="Bookmark to Slate"
                    shortcut="Option B"
                    icon="bookmark"
                    data={pageData}
                  />
                  
                  <Button 
                    text="Save text from page"
                    shortcut="Option S"
                    icon="tag"
                  />

                  <Button 
                    text="Add to collection"
                    shortcut="Option C"
                    icon="plus"
                  />

                  <Button 
                    text="Save link to Slate"
                    shortcut="Option S"
                    icon="plus"
                  />
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ModalContext.Consumer>
  );
};

export default Modal;
