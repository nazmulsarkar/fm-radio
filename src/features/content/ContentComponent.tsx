import React from 'react';
import { observer } from 'mobx-react-lite';
import { Segment } from 'semantic-ui-react';

export default observer(function ContentComponent() {
    return (
        <>
            <Segment>Content</Segment>
            <Segment>Content</Segment>
        </>
    )
})