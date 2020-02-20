import React from 'react';
import {compose} from 'recompose';
import {withHeader} from '@src/shared/components/header';

const enhance = WrappedComp => props => {
  return <WrappedComp {...props} headerTitle="SHIELD YOUR CRYPTO" />;
};

export default compose(enhance, withHeader);
