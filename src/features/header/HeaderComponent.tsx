import React from "react";
import { observer } from "mobx-react-lite";
import { Button, Grid, GridColumn, Header, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default observer(function HeaderComponent() {
  const backClick = () => {
    console.log('back clicked!')
  }
  const playOrPauseClick = () => {
    console.log('play or pause clicked!')
  }

  return (
    <Grid className={'middle aligned'}>
      <GridColumn>
        <Header as="h1" className={"text-uppercase text-color-white center aligned"}>
          <span className={'f-left'}>
            <Button as={Link} to='#' onClick={() => backClick()} className={'btn-arrow'}>
              <Image src={'./assets/back-arrow.png'} alt={'Back'} />
            </Button>
          </span>
          <span className={'lh-76'}>Stations</span>
          <span className={'f-right'}>
            <Button as={Link} to='#' onClick={() => playOrPauseClick()} className={'btn-switch'}>
              <Image src={'./assets/switch.png'} alt={'Play or Pause'} />
            </Button>
          </span>
        </Header>
      </GridColumn>
    </Grid>
  );
});
