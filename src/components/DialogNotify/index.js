import { ButtonExtension, Text, View } from '@components/core';
import { DEVICES } from '@src/constants/miner';
import DeviceService from '@src/services/DeviceService';
import NodeService from '@src/services/NodeService';
import LocalDatabase from '@src/utils/LocalDatabase';
import Util from '@src/utils/Util';
import ViewUtil from '@src/utils/ViewUtil';
import React, { useCallback, useMemo } from 'react';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import styles from './style';

const TAG = 'DialogNotify';

const Loading = React.memo((props)=>{
  return (
    <View style={styles.dialog_content}>
      {ViewUtil.loadingComponent()}
      <Text style={styles.dialog_content_text}>Wait a moment</Text>
    </View>
  );
});

const ProcessingUpgrade = React.memo(({device,isUpdating,onSuccess,onFail,onClose})=>{
  const [loading,setLoading] = React.useState(false);
  const [textContent,setTextContent] = React.useState('');
  const onPressButton = useCallback(async () => {
    console.log(TAG,'DialogUpdateFirmware onPressButton',isUpdating);
    onClose&&onClose();

  },[]);
  const processingUpgrade = async () =>{
    if(device && device.Type == DEVICES.MINER_TYPE){
      console.log(TAG,'processingUpgrade begin isUpdating = ');
      setLoading(true);
      const {isHave=false,current,node} = await NodeService.checkUpdatingVersion(device).catch(console.log)??{};
      console.log(TAG,'processingUpgrade begin 01');
      if(isHave){
        return new Error('Have new version');
      }else{
        setTextContent('Node firmware is upgraded successfully.');
        onSuccess&&onSuccess(current);
      }
      setLoading(false);
      return true;
    }
  };

  useMemo(
    async ()=>{
      if(isUpdating){
        console.log(TAG,'ProcessingUpgrade memo updating ------');
        await Util.tryAtMost(processingUpgrade,15,3);
      }
    },
    [isUpdating]
  );
  return (
    <>
      {loading?<Loading />: (
        <>
          <View style={styles.dialog_content}>
            <Text style={styles.dialog_content_text}>{textContent}</Text>
          </View>
          <ButtonExtension
            titleStyle={styles.textTitleButton}
            buttonStyle={styles.dialog_button}
            onPress={onPressButton}
            title='OK'
          />
        </>
      )}
    </>
  );
});

export const DialogUpdateFirmware = React.memo(({visible,device,onClose})=>{
  // const {  textInput, item,item_container_input,label } = styles;

  const [isShowMessage,setIsShowMessage] = React.useState(false);

  const [loading,setLoading] = React.useState(false);
  const [isHaveUpdate,setHaveUpdate] = React.useState(false);
  const [isUpdating,setUpdating] = React.useState(device.isUpdatingFirmware());
  const [textContent,setTextContent] = React.useState('');
  const [textTitle,setTextTitle] = React.useState('Node');
  const [lableButton,setLableButton] = React.useState('OK');
  const requestVersion = async () =>{
    if(device && device.Type == DEVICES.MINER_TYPE){
      console.log(TAG,'requestVersion begin isUpdating = ',isUpdating);
      setLoading(true);
      const {isHave=false,current,node} = await NodeService.checkUpdatingVersion(device).catch(console.log);
      if(isHave ){
        if(isUpdating){
          setLableButton('OK');
          setTextContent('Updating... It might take about 5 mins.');
        }else{
          setTextContent('New update available. Please tap to update.');
          setLableButton('Update Now');
        }
      }else{
        setTextContent('You’re all up to date.');
        setLableButton('OK');
        if(isUpdating){
          setUpdating(false);
          await LocalDatabase.saveUpdatingFirware(device.ProductId,false);
        }
      }
      setTextTitle(`Node v${node??''}`);
      setHaveUpdate(isHave);
      setLoading(false);
      if(isHave){
        return new Error('Have new version');
      }
      return true;
    }
  };

  useMemo(
    ()=>requestVersion().catch(console.log),
    [visible]
  );

  const handleUpgradeSuccess =  useCallback(async(newVersion) => {
    // setUpdating(false);
    setTextTitle(`Node v${newVersion??''}`);
    await LocalDatabase.saveUpdatingFirware(device.ProductId,false);
  },[isUpdating]);


  const onTouchOutside = useCallback(() => {
    console.log(TAG,'DialogUpdateFirmware onTouchOutside');
    setIsShowMessage(false);
    onClose&&onClose();
  },[isShowMessage]);
  const onPressButton = useCallback(async () => {
    console.log(TAG,'DialogUpdateFirmware onPressButton',isUpdating,'-isHaveUpdate = ',isHaveUpdate);
    if(isHaveUpdate && !isUpdating ){
      setLoading(true);
      // send action
      const result= await DeviceService.updateFirmwareForNode(device);
      if(result >= 0){
        setUpdating(true);
        setLableButton('OK');
        setTextContent('Updating... It might take about 5 mins.');
      }
      setLoading(false);
    }else{
      onClose&&onClose();
    }
  },[isHaveUpdate]);


  return (
    <Dialog
      width={0.8}
      height={0.35}
      visible={visible}
      onTouchOutside={onTouchOutside}
    >
      <DialogContent style={styles.dialog_container}>
        <Text style={styles.dialog_title_text}>{textTitle}</Text>

        {isUpdating?<ProcessingUpgrade device={device} isUpdating={isUpdating} onSuccess={handleUpgradeSuccess} onClose={()=>onClose&&onClose()} />:(
          loading?<Loading />: (
            <>
              <View style={styles.dialog_content}>
                <Text style={styles.dialog_content_text}>{textContent}</Text>
              </View>
              <ButtonExtension
                titleStyle={styles.textTitleButton}
                buttonStyle={styles.dialog_button}
                onPress={onPressButton}
                title={lableButton}
              />
            </>
          )
        )}
      </DialogContent>

    </Dialog>
  );
});
