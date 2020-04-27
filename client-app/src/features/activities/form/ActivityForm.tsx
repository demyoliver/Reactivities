import React, { useState, FormEvent, useContext } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IActivity } from '../../../app/model/activity';
import {v4 as uuid} from 'uuid'
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore';

interface IProps {
    activity: IActivity;
}

const ActivityForm: React.FC<IProps> = ({ activity: initialActivityState }) => {

    const initialActivity = () => {        
        if (initialActivityState) {
            return initialActivityState;
        } else {
            return {
                id: '',
                title: '',
                description: '',
                category: '',
                date: '',
                city: '',
                venue: '',
            }
        }
    }

    const activityStore = useContext(ActivityStore);
    const { createActivity, setEditMode, submitting, editActivity } = activityStore;
    const [activity, setActivity] = useState<IActivity>(initialActivity)    

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
            createActivity(newActivity);
        } else{
            editActivity(activity);
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