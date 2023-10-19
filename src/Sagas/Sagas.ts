import uuid from 'react-native-uuid';
import { takeEvery } from 'redux-saga/effects';

import { ADD_NOTE } from '../Redux/Slice/Notes/Notes.slice';

function* handleAddNote(action) {

	const { payload } = action;
	const id = uuid.v4();
	const generateData = {
		id,
		...payload
	};

	return generateData;	
}

function* rootSaga() {

	yield takeEvery(ADD_NOTE.type, handleAddNote);
}

export default rootSaga;