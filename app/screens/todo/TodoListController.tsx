import {useTodoStore} from '@/controller/store';
import firestore from '@react-native-firebase/firestore';
import dayjs from 'dayjs';
import {useEffect, useState} from 'react';

const TodoListController = () => {
  const [data, setData] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const {date, setDate} = useTodoStore();

  const getCollection = async () => {
    let dataKey: string[] = [];
    let dataValue = [];
    const snapshot = await firestore()
      .collection('todo_list')
      .doc(dayjs(new Date()).format('DD-MM-YYYY'))
      .collection('data')
      .orderBy('timestamp', 'asc')
      .get();
    dataKey = snapshot?.docs.map(doc => doc.id);
    dataValue = snapshot.docs.map(doc => doc.data());
    let data = dataValue.map((value, index) => {
      return {...value, key: dataKey[index]};
    });
    return data;
  };

  const getDocument = async (collection: string, doc: string) => {
    const snapshot = await firestore().collection(collection).doc(doc).get();
    return snapshot.data();
  };

  const addDocument = async (data: object) => {
    await firestore()
      .collection('todo_list')
      .doc(date)
      .collection('data')
      .add(data);
  };

  const updateDocument = async (id: string, data: object) => {
    await firestore()
      .collection('todo_list')
      .doc(date)
      .collection('data')
      .doc(id)
      .update(data);
  };

  const deleteDocument = async (key: string) => {
    await firestore()
      .collection('todo_list')
      .doc(date)
      .collection('data')
      .doc(key)
      .delete();
  };

  const getCollectionRealtime = (
    collection: string,
    callback: (data: any) => void,
  ) => {
    return firestore()
      .collection(collection)
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => doc.data());
        callback(data);
      });
  };

  const getDocumentRealtime = (callback: (data: any) => void) => {
    let dataKey: string[] = [];
    let dataValue = [];
    return firestore()
      .collection('todo_list')
      .doc(date)
      .collection('data')
      .onSnapshot(snapshot => {
        dataKey = snapshot.docs.map(doc => doc.id);
        dataValue = snapshot.docs.map(doc => doc.data());
        let data = dataValue
          .map((value, index) => {
            return {...value, key: dataKey[index]};
          })
          .sort((a: any, b: any) => {
            // Assuming 'timestamp' is a Date object or a number representing milliseconds since epoch
            return a.timestamp - b.timestamp;
          });
        callback(data);
      });
  };

  useEffect(() => {
    getCollection().then(data => setData(data));
    getDocumentRealtime(data => {
      setData(data);
    });
  }, []);

  return {
    getCollection,
    getDocument,
    addDocument,
    updateDocument,
    deleteDocument,
    getCollectionRealtime,
    getDocumentRealtime,
    data,
    open,
    setOpen,
    date,
    setDate,
  };
};

export default TodoListController;
