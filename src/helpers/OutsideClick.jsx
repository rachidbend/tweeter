/* eslint-disable react/prop-types */
import { useEffect } from 'react';

// this component is used to add the ability to perform a tast when a click is registered outside of a specific component
export default function OutsideClick({ onClose, componentRef }) {
  // this useEffect is used to keep the functionality working at all times
  useEffect(
    function () {
      // this function is what checks if the click was registered ouside or inside of the component provided
      function handleClickOutside(e) {
        // if the click was registered inside of the target component, then nothing happens
        if (!componentRef.current) return;

        // but if the click was registered ouside of the target component, then the onClose handler is called
        if (componentRef.current && !componentRef.current.contains(e.target))
          onClose();
      }

      // an evnet is attatched to the document to be able to tell where a click has originated
      document.addEventListener('click', handleClickOutside, {
        capture: true,
      });

      // a cleanup function to remove the handler to avoid stacking events listeners on the document
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    },

    [componentRef, onClose]
  );

  // this component returns nothing because all it does is call the provided handler when the condition is met.
  return null;
}
