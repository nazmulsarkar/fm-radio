import React, { Fragment } from 'react';
import { Segment, Placeholder } from 'semantic-ui-react';

export default function RadioListItemPlaceholder() {
    return (
        <Fragment>
            <Placeholder fluid style={{ marginTop: 25 }}>
                <Segment.Group>
                    <Segment style={{ minHeight: 110 }}>
                        <Placeholder>
                            <Placeholder.Header>
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder.Header>
                        </Placeholder>
                    </Segment>
                </Segment.Group>
            </Placeholder>
        </Fragment>
    );
};