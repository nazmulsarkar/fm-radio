import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import { RadioFormValues } from '../../../app/models/radio';

export default observer(function RadioForm() {
    const history = useHistory();
    const { radioStore } = useStore();
    const { createRadio, updateRadio, loadRadio, loadingInitial } = radioStore;
    const { id } = useParams<{ id: string }>();

    const [radio, setRadio] = useState<RadioFormValues>(new RadioFormValues());

    const validationSchema = Yup.object({
        title: Yup.string().required('The radio title is required'),
        description: Yup.string().required('The radio description is required')
    })

    useEffect(() => {
        if (id) loadRadio(id).then(radio => setRadio(new RadioFormValues(radio)))
    }, [id, loadRadio]);

    function handleFormSubmit(radio: RadioFormValues) {
        if (!radio.id) {
            let newRadio = {
                ...radio
            };
            createRadio(newRadio).then(() => history.push(`/radios`))
        } else {
            updateRadio(radio).then(() => history.push(`/radios/${radio.id}`))
        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading radio...' />

    return (
        <Segment clearing>
            <Header content='Radio Details' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={radio}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='title' placeholder='Title' />
                        <MyTextArea rows={3} placeholder='Description' name='description' />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting} floated='right'
                            positive type='submit' content='Submit' />
                        <Button as={Link} to='/radios' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>

        </Segment>
    )
})