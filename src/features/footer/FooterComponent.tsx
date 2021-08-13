import React from "react";
import { observer } from "mobx-react-lite";
import { Header } from "semantic-ui-react";
import { Radio } from "../../app/models/radio";

interface Props {
  selectedFM: Radio;
}

export default observer(function FooterComponent({ selectedFM }: Props) {
  return (
    <>
      <Header as="h5" className={"mb-0 text-uppercase txt-playing center aligned"}>
        Currently Playing
      </Header>
      <Header as="h1" className={"animate__animated animate__jello mt-0 text-color center aligned"}>
        {selectedFM.title}
      </Header>
    </>
  );
});
