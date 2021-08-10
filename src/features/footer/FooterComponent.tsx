import React from 'react';
import { observer } from 'mobx-react-lite';
import { Header } from 'semantic-ui-react';
export default observer(function FooterComponent() {
    return (
        <Header as='h1' className={'text-uppercase'}>
            Stations
        </Header>
    )
})