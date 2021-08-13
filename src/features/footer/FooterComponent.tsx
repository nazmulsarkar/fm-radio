import React from "react";
import { observer } from "mobx-react-lite";
import { Header } from "semantic-ui-react";
export default observer(function FooterComponent() {
  return (
    <>
      <Header as="h5" className={"mb-0 text-uppercase txt-playing center aligned"}>
        Currently Playing
      </Header>
      <Header as="h1" className={"mt-0 text-color center aligned"}>
        Dribbble FM
      </Header>
    </>
  );
});
