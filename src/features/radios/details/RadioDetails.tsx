import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import RadioDetailedInfo from './RadioDetailedInfo';
import RadioDetailedHeader from './RadioDetaledHeader';

export default observer(function RadioDetails() {
    const { radioStore } = useStore();
    const { selectedRadio: radio, loadRadio, loadingInitial, clearSelectedRadio } = radioStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) loadRadio(id);
        return () => clearSelectedRadio();
    }, [id, loadRadio, clearSelectedRadio]);

    if (loadingInitial || !radio) return <LoadingComponent />;

    return (
        <Grid>
            <Grid.Column width={10}>
                <RadioDetailedHeader radio={radio} />
                <RadioDetailedInfo radio={radio} />
            </Grid.Column>
            <Grid.Column width={6}>
            </Grid.Column>
        </Grid>
    )
})