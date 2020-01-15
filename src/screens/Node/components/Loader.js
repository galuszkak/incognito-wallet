import { scaleInApp } from '@src/styles/TextStyle';
import React, { Component, useEffect, useRef } from 'react';
import ContentLoader, { Facebook, Rect } from 'react-content-loader/native';
import { Animated, StyleSheet, View } from 'react-native';

const TAG = 'Loader';
const SizeItemBox = {
  width: scaleInApp(7),
  height: scaleInApp(20),
};
const style = StyleSheet.create({
  container: {
    height:scaleInApp(60),
    justifyContent:'center'
  },
  earning_container:{
    flexDirection:'row',
  },
  earning_box:{
    width: SizeItemBox.width,
    height: SizeItemBox.height,
    marginHorizontal:scaleInApp(4),
    borderRadius: scaleInApp(2),
  },
});

const usePulse = ({start = 1,to=2},startDelay = 500,duration = 300) => {
  const scale = useRef(new Animated.Value(start)).current;

  const pulse = () => {
    return Animated.sequence([
      Animated.timing(scale, { toValue: to,duration:duration }),
      Animated.timing(scale, { toValue: start,duration:duration }),
    ]).start(() => pulse());
  };

  useEffect(() => {
    const timeout = setTimeout(() => pulse(), startDelay);
    return () => {
      scale.stopAnimation(({value})=>console.log(TAG,'usePulse stop ===='));
      clearTimeout(timeout);
    };
  }, []);
  return scale;
};

export const FetchingLoader = React.memo(({color = '#25CDD6',isVisible = true, scale = 1 })=>{
  const startDelay = 0;
  const duration = 600;
  const scale1 = usePulse({start:1,to:3},startDelay,duration);
  const scale2 = usePulse({start: 1,to:3},startDelay+ duration,duration);
  const scale3 = usePulse({start:1,to:3},startDelay+ duration*2,duration/2);

  return (
    <View style={[style.earning_container,{display:isVisible?'flex':'none', transform: [{ scale }, { translateX: 0 }]}]}>
      <Animated.View style={[style.earning_box,{backgroundColor: color,transform:[{scaleY:scale1}]}]} />
      <Animated.View style={[style.earning_box,{backgroundColor: color,transform:[{scaleY:scale2}]}]} />
      <Animated.View style={[style.earning_box,{backgroundColor: color,transform:[{scaleY:scale3}]}]} />

      <Animated.View style={[style.earning_box,{backgroundColor: color,transform:[{scaleY:scale2}]}]} />
      <Animated.View style={[style.earning_box,{backgroundColor: color,transform:[{scaleY:scale1}]}]} />
      <Animated.View style={[style.earning_box,{backgroundColor: color,transform:[{scaleY:scale3}]}]} />
    </View>
  );
});

const MyLoader = () => (
  <ContentLoader
    height="100%"
    width="100%"
    viewBox="0 0 150 70"
    speed={1}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <Rect x="0" y="0" rx="3" ry="3" width="70" height="10" />
    <Rect x="80" y="0" rx="3" ry="3" width="100" height="10" />
    <Rect x="190" y="0" rx="3" ry="3" width="10" height="10" />

    <Rect x="15" y="20" rx="3" ry="3" width="130" height="10" />
    <Rect x="155" y="20" rx="3" ry="3" width="130" height="10" />

    <Rect x="15" y="40" rx="3" ry="3" width="90" height="10" />
    <Rect x="115" y="40" rx="3" ry="3" width="60" height="10" />
    <Rect x="185" y="40" rx="3" ry="3" width="60" height="10" />

    <Rect x="0" y="60" rx="3" ry="3" width="30" height="10" />
  </ContentLoader>

);
const MyFacebookLoader = () => <Facebook />;

class Loader extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <View style={style.container}>
        <MyLoader />
      </View>
    );
  }
}

Loader.propTypes = {

};
export default Loader;

