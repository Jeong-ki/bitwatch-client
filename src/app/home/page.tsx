'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@/components/common/spinner';
import { getUsers } from '@/api/auth';

const HomePage = () => {
  let a;

  const { data, isFetched } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  if (!isFetched) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p data-testid="email">{data?.data[0].email}</p>
    </div>
  );
};

export default HomePage;
