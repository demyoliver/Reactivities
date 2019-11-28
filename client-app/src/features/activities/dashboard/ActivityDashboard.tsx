import React from 'react'
import { IActivity } from '../../../app/model/activity'
import { Grid } from 'semantic-ui-react'
import ActivityList from "./ActivityList"
import ActivityDetails from '../ActivityDetails'
import ActivityForm from '../form/ActivityForm'

interface IProps {
    activities: IActivity[];
    selectActivity: (id: string) => void;
    selectedActivity: IActivity | null;
    setEditMode: (editMode: boolean) => void;
    editMode: boolean;
}

const ActivityDashboard: React.FC<IProps> = ({activities, selectActivity, selectedActivity, setEditMode, editMode}) => {
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList activities={activities} selectActivity={selectActivity}/>
            </Grid.Column>   
            <Grid.Column width={6}>
                {selectedActivity && !editMode && (<ActivityDetails activity={selectedActivity} setEditMode={setEditMode}/>)}
                {editMode && <ActivityForm setEditMode={setEditMode} />}
            </Grid.Column>         
        </Grid>
    )
}

export default ActivityDashboard
