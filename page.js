import React from 'react';

import { PageContainer, Breadcrumbs } from '../../src/components';

const Page = () => {
  return (
    <PageContainer className="my-page">
      <Breadcrumbs pages={['My Page']}/>
      <div>
        A page
      </div>
    </PageContainer>
  );
};

export default Page;
