import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Box, Container} from '@/components';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Constant from '@/controller/Constant';
import TodoListController from '../TodoListController';
import SwipableItem from './SwipableItem';

type ItemTodoProps = {
  data: any;
  onPress?: () => void;
};

const ItemTodo = ({data}: ItemTodoProps) => {
  const [isChecked, setIsChecked] = React.useState(data.status);
  const {updateDocument, deleteDocument} = TodoListController();

  return (
    <SwipableItem
      children={
        <Box padding={5}>
          <BouncyCheckbox
            size={35}
            textStyle={styles.textStyle}
            fillColor={'#00d438'}
            unFillColor={'transparent'}
            text={data.content}
            isChecked={isChecked}
            iconStyle={{borderColor: 'red'}}
            innerIconStyle={{borderWidth: 2}}
            disabled={isChecked}
            onPress={(isChecked: boolean) => {
              setIsChecked(isChecked);
              updateDocument(data.key, {status: isChecked});
            }}
            style={{marginTop: 10}}
            iconImageStyle={styles.iconImageStyle}
          />
        </Box>
      }
      onDelete={() => deleteDocument(data.key)}
    />
  );
};

export default ItemTodo;

const styles = StyleSheet.create({
  iconImageStyle: {
    width: 16,
    height: 16,
    borderColor: '#9342f5',
  },
  textStyle: {
    color: '#010101',
    fontFamily: Constant.fonts.SVNSofia,
  },
});
