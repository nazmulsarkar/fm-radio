import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid, GridColumn, Header, Icon, Item, Segment } from "semantic-ui-react";
import { Radio } from "../../../app/models/radio";
import { format } from "date-fns";

interface Props {
  radio: Radio;
}

export default function RadioListItem({ radio }: Props) {
  return (
    <Segment inverted className={'margin-1em-x padding-x0'}>
      <Grid className={'middle aligned'}>
        <GridColumn>
          <Header as='h1' className={"text-color pad-y-12"}>
            <span className={'f-left'}>{radio.title}</span>
            <span className={'f-right'}>{radio.frequency}</span>
          </Header>
        </GridColumn>
      </Grid>
    </Segment>
  );
}
