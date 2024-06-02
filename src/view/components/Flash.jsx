import React, { useEffect } from 'react';

const Flash = ({ type, message, setMessage }) => {
  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        setMessage('');
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [message, setMessage]);

  if (!message) return null;

  const alertClass = type === 'error' ? 'alert alert-danger' : 'alert alert-success';

  return (
    <div className={alertClass}>
      <strong>{message}</strong>
    </div>
  );
};

export default Flash;
