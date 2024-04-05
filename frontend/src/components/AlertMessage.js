import React, { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import styles from "../styles/AlertMessage.module.css";

// Functional component for displaying alert messages
const AlertMessage = ({ variant, message, showAlert }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  };

  // this will run only when showAlert has been called
  // and if true shows alert then closes after
  // three seconds
  useEffect(() => {
    if (showAlert) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showAlert]);

  return (
    <>
      {show && (
        <Alert
          className={styles.Alert}
          variant={variant}
          onClose={handleClose}
          dismissible
        >
          {message}
        </Alert>
      )}
    </>
  );
};

// Custom hook for managing alert state and actions
export const useAlert = () => {
  const [alert, setAlert] = useState(null);

  // Show alert with specified variant and message
  const showAlert = (variant, message) => {
    setAlert({ variant, message });
  };

  const hideAlert = () => {
    setAlert(null);
  };

  return { alert, showAlert, hideAlert };
};

export default AlertMessage;
