import React from 'react';
import {
  View,
  Image,
  // Modal,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import routeNames from '@src/router/routeNames';
import srcImport from '@src/assets/images/icons/import.png';
import srcCreate from '@src/assets/images/icons/create.png';
import srcBackup from '@src/assets/images/icons/backup.png';
import srcThreeDots from '@src/assets/images/icons/three_dots.png';
import srcClose from '@src/assets/images/icons/close.png';
import {useSelector, useDispatch} from 'react-redux';
import Modal from '@src/shared/components/modal/modal';
import {modalSelector} from '@src/shared/components/modal/modal.selector';
import {actionToggleModal} from '@src/shared/components/modal/modal.actions';
import {styled} from './optionMenu.styled';

const MenuItem = ({
  srcIcon,
  label,
  desc,
  isLastChild = false,
  onPress = null,
  ...rest
}) => {
  const dispatch = useDispatch();
  const handleOnPress = () => {
    if (typeof onPress === 'function') {
      onPress();
    }
    dispatch(
      actionToggleModal({
        visible: false,
        data: null,
      }),
    );
  };
  return (
    <TouchableOpacity {...rest} onPress={handleOnPress}>
      <View
        style={[styled.itemContainer, isLastChild ? styled.lastItem : null]}
      >
        <Image source={srcIcon} style={styled.icon} />
        <View style={styled.infoContainer}>
          <Text style={styled.label}>{label}</Text>
          <Text style={styled.desc}>{desc}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Menu = () => {
  const navigation = useNavigation();
  const handleImport = () => {
    navigation.navigate(routeNames.ImportAccount);
  };

  const handleCreate = () => {
    navigation.navigate(routeNames.CreateAccount);
  };

  const handleBackup = () => {
    navigation.navigate(routeNames.BackupKeys);
  };

  const data = [
    {
      id: 'import',
      srcIcon: srcImport,
      desc: 'Import an existing account',
      label: 'Import',
      onPress: handleImport,
    },
    {
      id: 'create',
      srcIcon: srcCreate,
      desc: 'Create a new account',
      label: 'Create',
      onPress: handleCreate,
    },
    {
      id: 'backup',
      srcIcon: srcBackup,
      desc: 'Backup your account keys',
      label: 'Backup',
      onPress: handleBackup,
    },
  ];

  return (
    <View style={styled.menuContainer}>
      {data.map((item, index, arr) => (
        <MenuItem
          key={item.id}
          isLastChild={arr.length - 1 === index}
          {...item}
        />
      ))}
    </View>
  );
};

const Main = () => {
  const dispatch = useDispatch();
  const handleToggle = () =>
    dispatch(
      actionToggleModal({
        visible: false,
        data: null,
      }),
    );
  return (
    <View style={styled.container}>
      <TouchableOpacity onPress={handleToggle}>
        <View style={styled.btnCloseContainer}>
          <Image source={srcClose} style={styled.btnClose} />
        </View>
      </TouchableOpacity>
      <Menu />
      <View style={styled.btmLine} />
    </View>
  );
};

const AccountOptionMenu = props => {
  const dispatch = useDispatch();
  const {visible} = useSelector(modalSelector);
  const handleToggle = () =>
    dispatch(
      actionToggleModal({
        visible: true,
        data: <Main />,
      }),
    );
  if (!visible) {
    return (
      <TouchableWithoutFeedback onPress={handleToggle}>
        <View style={styled.btnMore}>
          <Image source={srcThreeDots} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
  return <Modal />;
};

AccountOptionMenu.propTypes = {};

export default AccountOptionMenu;
