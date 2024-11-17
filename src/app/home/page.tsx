'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@/components/common/spinner';
import { getUsers } from '@/api/auth';
import useTestStore from '@/store/input';

const HomePage = () => {
  const { testInput, setTestInput } = useTestStore();

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
      <input
        name="testInput"
        id="testInput"
        aria-label="testInput"
        type="text"
        onChange={(e) => {
          setTestInput(e.target.value);
        }}
        value={testInput}
      />
      <p>입력값: {testInput}</p>
    </div>
  );
};

export default HomePage;
