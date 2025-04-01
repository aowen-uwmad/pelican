'use client';

import CacheMetricPage from '@/components/graphs/CacheMetricPage';
import { Suspense } from 'react';
import { Skeleton } from '@mui/material';
import { useSearchParams } from 'next/navigation';

const RemoteOriginPage = () => {
  const params = useSearchParams();
  const serverName = params.get('server_name') || undefined;

  return <CacheMetricPage server_name={serverName} />;
};

const Page = () => {
  return (
    <Suspense fallback={<Skeleton />}>
      <RemoteOriginPage />
    </Suspense>
  );
};

export default Page;
