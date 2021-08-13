import { observer } from "mobx-react-lite";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
import { Radio } from "../../../app/models/radio";
import { useStore } from "../../../app/stores/store";
import FooterComponent from "../../footer/FooterComponent";
import HeaderComponent from "../../header/HeaderComponent";
import RadioListItem from "./RadioListItem";

export default observer(function RadioList() {
  const { radioStore } = useStore();
  const { radiosByDate } = radioStore;

  const [radioList, setRadioList] = useState(radiosByDate);
  const isMock = true;

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
        });
      // return data[`${dataType}`];
    },
    [setRadioList]
  );

  //   console.log("radios: ", radiosByDate);

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
          <RadioListItem key={radio.id} radio={radio} />
        ))}
        <Segment clearing className={'bg-footer-color shadow'} inverted>
          <FooterComponent></FooterComponent>
        </Segment>
      </Segment.Group>
    </>
  );
});
