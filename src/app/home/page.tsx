// HomePage.tsx
import React from 'react';
import { useRouter } from 'next/router';

const HomePage = () => {
  const router = useRouter();

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>Current path: {router.pathname}</p>
    </div>
  );
};

export default HomePage;
