import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { Radio } from '../../app/models/radio';
import { format } from 'date-fns';

interface Props {
    radio: Radio
}

export default function RadioListItem({ radio }: Props) {

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image style={{ marginBottom: 3 }} size='tiny' circular src={'/assets/categoryImages/film.jpg'} />
                        <Item.Content>
                            <Item.Header as={Link} to={`/radios/${radio.id}`}>
                                {radio.title}
                            </Item.Header>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(new Date(radio.created_at!), 'dd MMM yyyy h:mm aa')}
                </span>
            </Segment>
            <Segment clearing>
                <span>{radio.frequency}</span>
                <Button
                    as={Link}
                    to={`/radioDetail/${radio.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}