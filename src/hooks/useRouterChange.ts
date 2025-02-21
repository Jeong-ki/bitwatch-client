import { usePathname, useSearchParams } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';
import usePrevious from './usePrevious';

export const useRouterChange = ({
  onRouteChangeStart
}: {
  onRouteChangeStart: (url: string) => void;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [fullPathname, setFullPathname] = useState<string>('');
  const prevFullPathname = usePrevious(fullPathname);

  useLayoutEffect(() => {
    const url = pathname + searchParams.toString();
    if (!url) {
      return;
    }
    setFullPathname(url);
    if (
      !!prevFullPathname &&
      !!fullPathname &&
      fullPathname !== prevFullPathname
    ) {
      onRouteChangeStart(url);
    }
  }, [pathname, searchParams, fullPathname]);
};
