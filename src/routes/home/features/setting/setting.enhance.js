import React from 'react';
import {compose} from 'recompose';
import {withHeader} from '@src/shared/components/header';
import {Button} from '@src/shared/components/button';
import {useNavigation} from 'react-navigation-hooks';
import routeNames from '@src/router/routeNames';
import {styled} from './setting.styled';

const enhance = WrappedComp => props => {
  const navigation = useNavigation();
  return (
    <WrappedComp
      props={props}
      headerTitle="YOU"
      rightCol={(
        <Button
          title="Backup"
          onPress={() => navigation.navigate(routeNames.BackupKeys)}
          style={styled.btnBackup}
        />
      )}
    />
  );
};

export default compose(enhance, withHeader);
