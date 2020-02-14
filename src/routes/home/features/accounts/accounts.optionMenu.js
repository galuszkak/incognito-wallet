import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Modal,
  Text,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import routeNames from '@src/router/routeNames';
import srcImport from '@src/assets/images/icons/import.png';
import srcCreate from '@src/assets/images/icons/create.png';
import srcBackup from '@src/assets/images/icons/backup.png';
import srcThreeDots from '@src/assets/images/icons/three_dots.png';
import {FONT} from '@src/styles';
import {useSelector, useDispatch} from 'react-redux';
import {modalSelector} from '@src/shared/components/modal/modal.selector';
import {TouchableOpacity} from '@src/components/core';
import srcClose from '@src/assets/images/icons/close.png';

const styled = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '50%',
    backgroundColor: '#fff',
    bottom: 0,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontFamily: FONT.NAME.bold,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 6,
    color: '#000',
    flex: 1,
  },
  desc: {
    flex: 3,
    color: 'rgba(127, 127, 127, 0.2)',
    fontFamily: FONT.NAME.regular,
    fontSize: FONT.SIZE.regular,
    lineHeight: FONT.SIZE.regular + 6,
  },
  btnMore: {
    width: 20,
    height: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  menuContainer: {},
  modalContent: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    position: 'relative',
  },
});

const MenuItem = ({icon, label, desc, handlePress}) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styled.itemContainer}>
        {icon}
        <View>
          <Text style={styled.label}>{label}</Text>
          <Text style={styled.desc}>{desc}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Menu = () => {
  const navigation = useNavigation();
  const {toggle} = useSelector(modalSelector);
  const dispatch = useDispatch();
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
      icon: <Image source={srcImport} />,
      desc: 'Import an existing account',
      label: 'Import',
      handlePress: handleImport,
    },
    {
      id: 'create',
      icon: <Image source={srcCreate} />,
      desc: 'Create a new account',
      label: 'Create',
      handlePress: handleCreate,
    },
    {
      id: 'backup',
      icon: <Image source={srcBackup} />,
      desc: 'Backup your account keys',
      label: 'Backup',
      handlePress: handleBackup,
    },
  ];

  return (
    <View style={styled.menuContainer}>
      {data.map(item => (
        <MenuItem key={item.id} {...item} />
      ))}
    </View>
  );
};

const AccountOptionMenu = props => {
  const [visible, toggleModal] = React.useState(false);
  const handleToggle = () => toggleModal(!visible);
  if (!visible) {
    return (
      <TouchableWithoutFeedback onPress={handleToggle}>
        <View style={styled.btnMore}>
          <Image source={srcThreeDots} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View style={styled.modalContent}>
        <View style={styled.container}>
          <TouchableWithoutFeedback onPress={handleToggle}>
            <Image source={srcClose} />
          </TouchableWithoutFeedback>
          <Menu />
        </View>
      </View>
    </Modal>
  );
};

AccountOptionMenu.propTypes = {};

export default AccountOptionMenu;
