import { observer } from 'mobx-react-lite';
import React from 'react'
import { Header, Item, Segment, Image } from 'semantic-ui-react'
import { Radio } from "../../../app/models/radio";
import { format } from 'date-fns';

const radioImageStyle = {
    filter: 'brightness(30%)'
};

const radioImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    radio: Radio
}

export default observer(function RadioDetailedHeader({ radio }: Props) {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                <Image src={`/assets/categoryImages/film.jpg`} fluid style={radioImageStyle} />
                <Segment style={radioImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={radio.title}
                                    style={{ color: 'white' }}
                                />
                                <p>{format(new Date(radio.created_at!), 'dd MMM yyyy')}</p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
        </Segment.Group>
    )
})