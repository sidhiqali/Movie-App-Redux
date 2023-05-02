// usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { auth, db } from '../Firebase/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from 'firebase/firestore';

const initialState = {
  user: '',
  userName: '',
  email: '',
  password: '',
};

export const signupAsyncUser = createAsyncThunk(
  'user/signupAsyncUser',
  async (_, { getState, dispatch }) => {
    const { userName, email, password } = getState().users;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const currentUser = userCredential.user;

      // Update the user's display name in Firebase Authentication
      await updateProfile(currentUser, { displayName: userName });

      // Store the user's display name in Firestore
      await addDoc(collection(db, 'users'), {
        userName: userName,
        uid: currentUser.uid,
        createdAt: serverTimestamp(),
      });

      // Update the userName state in Redux
      dispatch(addUserName(userName));

      return currentUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const signInAsyncUser = createAsyncThunk(
  'user/signInAsyncUser',
  async (_, { getState, dispatch }) => {
    const { email, password } = getState().users;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const currentUser = userCredential.user;

      // Retrieve the user's display name from Firestore using their uid
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      const userName = userDoc.data().userName;

      // Update the userName state in Redux
      dispatch(addUserName(userName));
      console.log(userName);

      return currentUser;
    } catch (error) {
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUserName: (state, action) => {
      state.userName = action.payload;
      console.log(state.userName);
    },
    addEmail: (state, action) => {
      state.email = action.payload;
    },
    addPassword: (state, action) => {
      state.password = action.payload;
    },
    removeData: (state, action) => {
      state.password = '';
      state.email = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupAsyncUser.pending, (state) => {
        console.log('signup pending');
      })
      .addCase(signupAsyncUser.fulfilled, (state, { payload }) => {
        console.log('signup successfully');
        state.user = payload;
        console.log(state.user);
      })
      .addCase(signupAsyncUser.rejected, (state) => {
        console.log('signup rejected');
      })
      .addCase(signInAsyncUser.fulfilled, (state, { payload }) => {
        console.log('signIn successfully');
        state.user = payload;
        console.log(state.user);
      });
  },
});

export const { removeData, addAllUsers, addEmail, addPassword, addUserName } =
  userSlice.actions;
export const getUserName = (state) => state.users.userName;
export const getUser = (state) => state.users.user;
export const getEmail = (state) => state.users.email;
export const getPassword = (state) => state.users.password;
export default userSlice.reducer;
