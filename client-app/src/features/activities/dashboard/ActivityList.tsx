import React, { useContext } from "react"
import { Item, ItemGroup, Button, Label, Segment } from "semantic-ui-react"
import { observer } from "mobx-react-lite"
import ActivityStore from '../../../app/stores/activityStore';
import { Link } from "react-router-dom";

const ActivityList = () => {
    const activityStore = useContext(ActivityStore);
    const { activitiesByDate, deleteActivity, submitting, target } = activityStore;
    
    return (
        <Segment>
            <ItemGroup>
                {
                    activitiesByDate.map((activity) => (
                        <Item key={activity.id}>            
                            <Item.Content>
                                <Item.Header as='a'>{activity.title}</Item.Header>
                                <Item.Meta>{activity.date}</Item.Meta>
                                <Item.Description>
                                    <div>{activity.description}</div>
                                    <div>{activity.city}, {activity.venue}</div>                        
                                </Item.Description>
                                <Item.Extra>
                                <Button 
                                    name={activity.id}
                                    loading={target === activity.id && submitting} 
                                    onClick={(e) => deleteActivity(e, activity.id)} floated='right' content="Delete" color='red' />
                                    <Button as={Link} to={`/activities/${activity.id}`} floated='right' content="View" color='blue' />
                                    <Label basic content={activity.category} />
                                </Item.Extra>                
                            </Item.Content>  
                        </Item>                  
                    ))
                }
            </ItemGroup>
        </Segment>
    )
}

export default observer(ActivityList)