import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import HomePage from '../../features/home/HomePage';

function App() {
  const { commonStore } = useStore();

  useEffect(() => {
    commonStore.setAppLoaded();
  }, [commonStore])

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <ModalContainer />
      <Route exact path='/' component={HomePage} />
    </>
  );
}

export default observer(App);
