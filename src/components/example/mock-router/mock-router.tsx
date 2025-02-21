import { useRouter } from 'next/navigation';

export const MockRouterComponent = ({ href = '' }) => {
  const router = useRouter();
  return (
    <button onClick={() => router.push(href)}>
      The current route is: {href}
    </button>
  );
};
