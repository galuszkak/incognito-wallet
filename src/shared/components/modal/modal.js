// import React from 'react';
// import {View, StyleSheet} from 'react-native';
// import {useSelector} from 'react-redux';

// const styled = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.1)',
//   },
// });

// const Modal = ({}) => {
//   const {visible, data} = useSelector(state => state.modal);
//   return (
//     <Modal style={styled.container} animationType="slide" visible={visible}>
//       {data}
//     </Modal>
//   );
// };

// Modal.propTypes = {};

// export default Modal;
import React from 'react';
import {View, StyleSheet} from 'react-native';

const styled = StyleSheet.create({
  container: {},
});
const Template = props => {
  return <View style={styled.container} />;
};

Template.propTypes = {};

export default Template;
