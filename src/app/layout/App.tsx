import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
// import HomePage from '../../features/home/HomePage';
import { Container } from 'semantic-ui-react';
import ServerError from '../../features/errors/ServerError';
import NotFound from '../../features/errors/NotFound';
import RadioDashboard from '../../features/radios/dashboard/RadioDashboard';

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
      <Route exact path='/' component={RadioDashboard} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <Container style={{ marginTop: '7em' }}>
              <Switch>
                <Route exact path='/radios' component={RadioDashboard} />
                <Route path='/server-error' component={ServerError} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
