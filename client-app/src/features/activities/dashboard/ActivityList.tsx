import React, { SyntheticEvent } from "react"
import { Item, ItemGroup, Button, Label, Segment } from "semantic-ui-react"
import { IActivity } from "../../../app/model/activity"

interface IProps {
    activities: IActivity[];
    selectActivity: (id: string) => void;
    deleteActivity: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void; 
    submitting: boolean;
    target: string
}

const ActivityList: React.FC<IProps> = ({activities, selectActivity, deleteActivity, submitting, target}) => {
    return (
        <Segment>
            <ItemGroup>
                {
                    activities.map((activity) => (
                        <Item>            
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
                                    <Button onClick={() => selectActivity(activity.id)} floated='right' content="View" color='blue' />
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

export default ActivityList