import React from "react";
import { Grid, GridColumn, Header, Segment } from "semantic-ui-react";
import { Radio } from "../../../app/models/radio";

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
