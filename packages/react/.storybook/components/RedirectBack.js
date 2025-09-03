import React, { useEffect } from 'react';

const RedirectBack = () => {
  useEffect(() => {
    window.history.back();
  });

  return <p>You will be redirected.</p>;
};

export default RedirectBack;
