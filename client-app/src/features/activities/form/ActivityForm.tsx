import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IActivity } from '../../../app/model/activity';
import {v4 as uuid} from 'uuid'
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore';
import { RouteComponentProps } from 'react-router-dom';

interface DetailParams{
    id: string
}
const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({ match, history}) => {

    const activityStore = useContext(ActivityStore);
    const { createActivity, setEditMode, submitting, editActivity, loadActivity, activity:initialActivityState, clearActivity } = activityStore;

    const [activity, setActivity] = useState<IActivity>({
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: ''
    });
    
    useEffect(() => {        
        if(match.params.id && activity.id.length === 0){
            loadActivity(match.params.id).then(
                () => initialActivityState && setActivity(initialActivityState)
            );
        }        
        return (() => {
            clearActivity()
        })
    }, [loadActivity, clearActivity, match.params.id, initialActivityState, activity.id.length]);    

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setActivity({ ...activity, [name]: value });
    }

    const handleSubmit = () => {
        if(activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity).then(() => {
                history.push(`/activities/${newActivity.id}`)
            })
        } else{
            editActivity(activity);
            history.push(`/activities/${activity.id}`)
        }
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input onChange={handleInputChange} name="title" placeholder='Title' value={activity.title} />
                <Form.TextArea onChange={handleInputChange} name="description" placeholder='Description' rows={2} value={activity.description} />
                <Form.Input onChange={handleInputChange} name="category" placeholder='Category' value={activity.category} />
                <Form.Input onChange={handleInputChange} name="date" type='datetime-local' placeholder='Date' value={activity.date} />
                <Form.Input onChange={handleInputChange} name="city" placeholder='City' value={activity.city} />
                <Form.Input onChange={handleInputChange} name="venue" placeholder='Venue' value={activity.venue} />
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                <Button onClick={() => setEditMode(false)} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}

export default observer(ActivityForm)