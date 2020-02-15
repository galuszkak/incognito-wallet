import React from 'react';
import {View, StyleSheet, Modal, TouchableWithoutFeedback} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {modalSelector} from './modal.selector';
import { actionToggleModal } from './modal.actions';

const styled = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    position: 'relative',
  },
});

const ModalComponent = props => {
  const {visible, data} = useSelector(modalSelector);
  const dispatch = useDispatch();
  const handleToggle = () =>
    dispatch(
      actionToggleModal({
        visible: false,
        data: null,
      }),
    );
  return (
    <Modal animationType="slide" transparent visible={visible}>
      {data}
      <TouchableWithoutFeedback onPress={handleToggle}>
        <View style={styled.overlay} />
      </TouchableWithoutFeedback>
    </Modal>
  );
};

ModalComponent.propTypes = {};

export default ModalComponent;
