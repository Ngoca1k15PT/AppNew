import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Box, Container} from '@/components';
import Constant from '@/controller/Constant';
import Icon from 'react-native-vector-icons/FontAwesome6';
import dayjs from 'dayjs';
import DatePicker from 'react-native-date-picker';
import TodoListController from '../TodoListController';
import {hideGlobalModal} from '@/modal/GlobalModal';
import {Timestamp} from '@react-native-firebase/firestore';

const ModalAdd = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [todo, setTodo] = useState('');
  const {addDocument, date, setDate} = TodoListController();

  return (
    <Box width={Constant.screen.width - 100}>
      <TouchableOpacity
        style={styles.btnDay}
        onPress={() => setDatePickerVisibility(true)}>
        <Text style={styles.textDay}>
          {date == dayjs(new Date()).format('DD-MM-YYYY') ? 'Today' : date}
        </Text>
        <Icon name="calendar-days" size={25} color={'#9e00ed'} />
      </TouchableOpacity>
      <Box
        maxHeight={120}
        borderWidth={1}
        borderRadius={10}
        borderColor="#9e00ed"
        padding={5}>
        <TextInput
          placeholder="Add new todo"
          multiline
          value={todo}
          onChangeText={text => setTodo(text)}
          style={{fontFamily: Constant.fonts.SuperDream}}
        />
      </Box>
      {todo != '' && (
        <Box>
          <TouchableOpacity
            onPress={() => {
              addDocument({
                content: todo,
                status: false,
                timestamp: Timestamp.now().toMillis(),
              });
              setTodo('');
              hideGlobalModal('confirmation-modal');
            }}
            style={{
              backgroundColor: '#3de34b',
              padding: 12,
              borderRadius: 10,
              marginTop: 20,
              alignItems: 'center',
              marginHorizontal: 30,
            }}>
            <Text
              style={{color: 'white', fontFamily: Constant.fonts.SuperDream}}>
              Add
            </Text>
          </TouchableOpacity>
        </Box>
      )}
      <DatePicker
        modal
        mode="date"
        minimumDate={new Date('2020-01-01')}
        open={isDatePickerVisible}
        date={new Date()}
        buttonColor="#9e00ed"
        dividerColor="#9e00ed"
        onStateChange={state => console.log('onStateChange', state)}
        onConfirm={date => {
          setDatePickerVisibility(false);
          setDate(dayjs(date).format('DD-MM-YYYY'));
        }}
        onCancel={() => {
          setDatePickerVisibility(false);
        }}
      />
    </Box>
  );
};

export default ModalAdd;

const styles = StyleSheet.create({
  btnDay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderColor: '#9e00ed',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
  },
  textDay: {
    fontSize: 16,
    color: 'black',
    fontFamily: Constant.fonts.SuperDream,
  },
});
