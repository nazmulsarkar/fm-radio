import React from 'react';
import { observer } from 'mobx-react-lite';
import HeaderComponent from '../header/HeaderComponent';
import { Container, Segment } from 'semantic-ui-react';
import FooterComponent from '../footer/FooterComponent';
import ContentComponent from '../content/ContentComponent';

export default observer(function HomePage() {
    return (
        <div className='masthead bg-color'>
            <Container>
                <Segment.Group className={'shadow'}>
                    <Segment className={'bg-header-color'}>
                        <HeaderComponent></HeaderComponent>
                    </Segment>
                    <ContentComponent></ContentComponent>
                    <Segment className={'bg-footer-color'}>
                        <FooterComponent></FooterComponent>
                    </Segment>
                </Segment.Group>
            </Container>
        </div>
    )
})