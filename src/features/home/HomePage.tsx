import React from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Segment } from 'semantic-ui-react';
import FooterComponent from '../footer/FooterComponent';

export default observer(function HomePage() {

    return (
        <div className='masthead bg-color'>
            <Container>
                <Segment.Group className={'shadow'}>

                    <Segment className={'bg-footer-color'}>
                        <FooterComponent></FooterComponent>
                    </Segment>
                </Segment.Group>
            </Container>
        </div>
    )
})