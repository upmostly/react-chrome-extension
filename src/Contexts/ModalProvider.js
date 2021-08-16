import React, { useEffect, useState } from 'react';
import useWindowPosition from '../Hooks/useWindowPosition';

export const ModalContext = React.createContext({});

const ModalProvider = ({ children }) => {
  const { windowPosition } = useWindowPosition();
  const [extensionId, setExtensionId] = useState(undefined);
  const [search, setSearch] = useState({ query: null });

  const [pageData, setPageData] = useState({ 
    title: document.title,
    description: document.description,
    url: window.location.href
  });

  function getExtensionId() {
    window.postMessage({ type: "GET_EXTENSION_ID" }, "*");
  }

  useEffect(() => { 
    // Set up event listeners from Content script
    window.addEventListener("message", function(event) {
      if (event.source !== window) return;
      if (event.data.type && (event.data.type === "EXTENSION_ID_RESULT")) {
        setExtensionId(event.data.extensionId);
      }
    });
  }, []);

  console.log('document', pageData)

  return (
    <ModalContext.Provider
      value={{
        extensionId,
        getExtensionId,
        windowPosition,
        pageData,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
