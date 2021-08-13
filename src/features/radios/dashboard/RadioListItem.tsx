import React from "react";
import { Grid, Header } from "semantic-ui-react";
import { Radio } from "../../../app/models/radio";

interface Props {
  radio: Radio;
}

export default function RadioListItem({ radio }: Props) {
  return (
    <Grid className={'middle aligned'}>
      <Grid.Column>
        <Header as='h1' className={"text-color pad-y-12"}>
          <span className={'f-left'}>{radio.title}</span>
          <span className={'f-right'}>{radio.frequency}</span>
        </Header>
      </Grid.Column>
    </Grid>
  );
}
