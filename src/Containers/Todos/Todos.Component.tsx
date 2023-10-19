import React, { Suspense, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  RefreshControl,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Modal from "react-native-modal";
import uuid from "react-native-uuid";

import {
  GetEncrypt,
  GetModalProps,
  OnDelete,
  OnEdit,
  OnSave,
  PayloadNoteType,
  Props,
} from "./Todos.Types";
import CardComponent from "../../Components/CardComponent/Card.Component";
import { scaleHeight, scaleSize } from "../../Utils/Size/size.utils";
import styles from "./Todos.Styles";
import initialState from "./Todos.Component.config";
import getDataFromStorage from "../../Utils/CollectData/collectData";
import FallbackComponent from "../../Components/FallbackComponent/Fallback.Component";

/**
 *
 * @param {React.ReactNode} children - Children
 * @returns {React.ReactNode} - Wrapper for dismiss keyboard
 */
const DismissKeyboard = ({ children }: { children: React.ReactNode }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

/**
 * Render Content of children modal
 * @param {VoidFunction} save - Save data handler
 * @returns {React.ReactNode} - Render Content of modal
 */
const _renderContentModal = (
  save: OnSave,
  isEdit: PayloadNoteType
): React.ReactNode => {
  const [data, setData] = useState<PayloadNoteType>(initialState);
  const isDisable = !data.title && !data.description;
  const isEditing = !!isEdit.id;

  React.useEffect(() => {
    if (isEditing) setData(() => isEdit);
  }, [isEdit.id]);

  /**
   *
   * @param {string} value - Value of data
   * @param {string} key - Key of value
   * @returns {void} - Populate data form input to state
   */
  const _dataHandler = (value: string, key: string): void =>
    setData((prev) => ({ ...prev, [key]: value }));

  /**
   *
   * @param {PayloadNoteType} data - Payload note
   * @return {VoidFunction} - On submit
   */
  const _onSubmit = (data: PayloadNoteType): void => {
    save(data);
    setData(() => initialState);
  };

  return (
    <DismissKeyboard>
      <View style={styles.contentModal.container}>
        <Text style={styles.contentModal.title}>Add Note</Text>
        <TextInput
          testID="Title_Input"
          value={data.title}
          textAlign="center"
          onChangeText={(value) => _dataHandler(value, "title")}
          placeholder="Title"
          style={styles.contentModal.titleInput}
        />
        <TextInput
          testID="Description_Input"
          value={data.description}
          verticalAlign="middle"
          textAlignVertical="center"
          onChangeText={(value) => _dataHandler(value, "description")}
          placeholder="Description"
          multiline={true}
          numberOfLines={4}
          style={styles.contentModal.textAreaInput}
        />
        <TouchableOpacity
          testID="Save_Button"
          disabled={isDisable}
          onPress={() => _onSubmit(data)}
          style={styles.contentModal.buttonWrapper(isDisable)}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "500",
              opacity: isDisable ? 0.5 : 1,
            }}
          >
            {isEditing ? "Edit" : "Save"}
          </Text>
        </TouchableOpacity>
      </View>
    </DismissKeyboard>
  );
};

/**
 *
 * @param {boolean} isModalVisible - State of visible modal
 * @param {VoidFunction} _modalHandler - Modal handler showing
 * @returns {GetModalProps} - Props for modal
 */
const _getModalProps = (
  isModalVisible: boolean,
  _modalHandler: VoidFunction
): any => ({
  animationInTiming: 500,
  animationOutTiming: 500,
  animationIn: "slideInDown",
  useNativeDriver: false,
  avoidKeyboard: false,
  backdropOpacity: 0.3,
  isVisible: isModalVisible,
  onBackButtonPress: _modalHandler,
  onBackdropPress: _modalHandler,
});

const _refreshControl = (onRefresh: VoidFunction) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const refreshHandler = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      onRefresh();
      setRefreshing(false);
    }, 2000);
  }, []);

  return <RefreshControl refreshing={refreshing} onRefresh={refreshHandler} />;
};

/**
 *
 * @param {typeof MockNote} MockNote - Mock note data
 * @returns {React.ReactNode} - Render FlatList
 */
const _renderFlatList = (
  notes: PayloadNoteType[],
  onDelete: OnDelete,
  onEdit: OnEdit,
  getEncrypt: GetEncrypt
): React.ReactNode => (
  <FlatList
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ height: scaleHeight(500) }}
    refreshControl={_refreshControl(getEncrypt)}
    data={notes}
    keyExtractor={({ title }) => title}
    renderItem={({ item }) => (
      <CardComponent
        accessibilityLabel={`Note_${item.id}`}
        title={item.title}
        description={item.description}
        isMarked={item.isMarked}
        onDelete={() => onDelete(item.id)}
        onEdit={() => onEdit(item)}
      />
    )}
  />
);

/**
 *
 * @param {boolean} isModalVisible - State of modal visible
 * @param {VoidFunction} _modalHandler - Modal handler showing
 * @param {VoidFunction} _dataHandler - Data handler
 * @returns
 */
const _renderModal = (
  isModalVisible: boolean,
  _modalHandler: VoidFunction,
  _dataHandler: OnSave,
  isEdit: PayloadNoteType
): React.ReactNode => (
  <Modal testID="Modal" {..._getModalProps(isModalVisible, _modalHandler)}>
    {_renderContentModal(_dataHandler, isEdit)}
  </Modal>
);

const _renderEncryptResult = (encrypt: string): React.ReactNode => (
  <View
    style={styles.encryptContainer}
  >
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        overflow: "scroll",
      }}
    >
      <Text style={{ fontWeight: "800" }}>Result of encrypt</Text>
      <Text>{encrypt}</Text>
    </ScrollView>
  </View>
);

/**
 * Render Add button
 * @param {VoidFunction} modalHandler - Modal showing handler
 * @returns {React.ReactNode} - Render button add
 */
const _renderButtonAdd = (modalHandler: VoidFunction): React.ReactNode => (
  <Suspense fallback={<FallbackComponent />}>
    <TouchableOpacity
      testID="Add_Button"
      style={styles.contentModal.buttonAdd}
      onPress={modalHandler}
    >
      <Ionicons name="add-circle-outline" size={scaleSize(35)} color="gray" />
    </TouchableOpacity>
  </Suspense>
);

/**
 *
 * @param {Props} props - Props of Todo component
 * @returns {React.ReactNode} - Todo Component
 */
const TodoComponent = (props: Props): React.ReactNode => {
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [isEdit, setIsEdit] = React.useState(initialState);
  const [encryptResult, setEncryptResult] = React.useState("");
  const isEditing = !!isEdit.id;

  const _modalHandler: VoidFunction = () => {
    setIsModalVisible((prev) => !prev);
    setIsEdit(() => ({ id: "", title: "", description: "", isMarked: false }));
  };

  const saveHandler = (data: PayloadNoteType): void => {
    const id = data.id || uuid.v4();
    isEditing ? props.editNote(data) : props.addNote({ ...data, id: id });
    setIsModalVisible(() => false);
  };

  const deleteHandler = (data: string | number[]): void =>
    props.deleteNote(data);

  const editHandler = (data): void => {
    setIsEdit(() => data);
    setIsModalVisible(true);
  };

  const getEncrypt = (): Promise<void> =>
    getDataFromStorage("persist:key").then((data) => {
      setEncryptResult(data.notes);
    });

  React.useEffect(() => {
    getEncrypt();
  }, [props.notes, isModalVisible]);

  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      {_renderModal(isModalVisible, _modalHandler, saveHandler, isEdit)}
      <View style={styles.contentWrapper}>
        {_renderFlatList(props.notes, deleteHandler, editHandler, getEncrypt)}
        {_renderEncryptResult(encryptResult)}
      </View>
      {!isModalVisible && _renderButtonAdd(_modalHandler)}
    </SafeAreaView>
  );
};

export default TodoComponent;
