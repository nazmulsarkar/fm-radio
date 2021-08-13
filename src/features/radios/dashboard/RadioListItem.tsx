import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Icon, Item, Segment } from "semantic-ui-react";
import { Radio } from "../../../app/models/radio";
import { format } from "date-fns";

interface Props {
  radio: Radio;
}

export default function RadioListItem({ radio }: Props) {
  return (
    <Segment inverted className={'margin-1em-x padding-0'}>
      <Item.Group>
        <Item>
          <Item.Content>
            <Grid>
              <Grid.Column width="10">
                <Item.Header className={"text-color font-size33"}>
                  {radio.title}
                </Item.Header>
              </Grid.Column>
              <Grid.Column width="6" className={"right aligned"}>
                <Item.Header className={"text-color font-size33"}>
                  {radio.frequency}
                </Item.Header>
              </Grid.Column>
            </Grid>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  );
}
