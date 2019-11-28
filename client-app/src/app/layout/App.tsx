import React, { useState, useEffect, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';
import { IActivity } from '../model/activity';
import NavBar from '../../features/navbar/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';


const App = () => {

  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectedActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0])
    setEditMode(false);
  }

  const handleEditMode = (editMode: boolean) => {
    setEditMode(editMode);
  }

  const handleOpenCreateActivity = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities')
      .then((response) => {
        setActivities(response.data)
      });
  }, []);

  return (
    <Fragment>
      <NavBar openCreateActivity={handleOpenCreateActivity} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard 
          activities={activities} 
          selectActivity={handleSelectedActivity} 
          selectedActivity={selectedActivity} 
          setEditMode={handleEditMode}
          editMode={editMode}
          />
      </Container>

    </Fragment>
  );
}

export default App;

