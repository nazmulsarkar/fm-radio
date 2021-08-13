import { observer } from "mobx-react-lite";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Header, Image, Segment } from "semantic-ui-react";
import { Radio } from "../../../app/models/radio";
import { useStore } from "../../../app/stores/store";
import FooterComponent from "../../footer/FooterComponent";
import HeaderComponent from "../../header/HeaderComponent";
import RadioListItem from "./RadioListItem";

export default observer(function RadioList() {
  const { radioStore } = useStore();
  const { radiosByDate } = radioStore;
  const defaultRadio: Radio = {
    id: '1',
    title: "Putin FM",
    frequency: "66.6"
  }

  const [radioList, setRadioList] = useState(radiosByDate);
  const [selectedFM, setSelectedFM] = useState(defaultRadio);
  const isMock = true;

  const selectFM = (e: Radio) => {
    setSelectedFM(e);
  }

  const volumeDecreaseClick = () => {
    console.log('volume descreased!');
  }

  const volumeIncreaseClick = () => {
    console.log('volume inscreased!');
  }

  const getMockData = useCallback(
    (dataType: string) => {
      fetch("./mock-data/data.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((resp) => {
          return resp.json();
        })
        .then((myJson) => {
          setRadioList(myJson[`${dataType}`]);
          setSelectedFM(myJson[`${dataType}`][0])
        });
      // return data[`${dataType}`];
    },
    [setRadioList, setSelectedFM]
  );

  useEffect(() => {
    console.log("envMock: ", isMock);
    if (isMock) {
      getMockData("radioList");
    } else {
      setRadioList(radiosByDate);
    }
  }, [isMock, getMockData, radiosByDate]);

  return (
    <>
      <Segment.Group className={"bg-content-color"}>
        <Segment className={'bg-header-color'} inverted>
          <HeaderComponent></HeaderComponent>
        </Segment>
        {radioList.map((radio: Radio) => (
          <Segment key={radio.id} onClick={(e: any) => selectFM(radio)} inverted className={'margin-1em-x padding-x0'} style={{ cursor: 'pointer' }}>
            <Header as="div" className={`animate__animated animate__bounceInUp center aligned ${radio.id === selectedFM.id ? 'active-fm' : 'inactive-fm'}`} style={{ marginTop: 40 }}>
              <Grid className={'middle aligned'}>
                <Grid.Column width='4' className={'left aligned'}>
                  <Button as={Link} to='#' onClick={() => volumeDecreaseClick()} className={'btn-decrease'}>
                    <Image src={'./assets/minus.png'} alt={'Back'} />
                  </Button>
                </Grid.Column>
                <Grid.Column width='8' className={'center aligned'}>
                  <Image src={'./assets/ellipse.png'} alt={'Ellipse'} style={{ margin: 'auto' }} />
                </Grid.Column>
                <Grid.Column width='4' className={'right aligned'}>
                  <Button as={Link} to='#' onClick={() => volumeIncreaseClick()} className={'btn-increase right aligned'}>
                    <Image src={'./assets/plus.png'} alt={'Play or Pause'} />
                  </Button>
                </Grid.Column>
              </Grid>
            </Header>
            <RadioListItem radio={radio} />
          </Segment>
        ))}
        <Segment clearing className={'bg-footer-color shadow'} inverted>
          <FooterComponent selectedFM={selectedFM}></FooterComponent>
        </Segment>
      </Segment.Group>
    </>
  );
});
