import React, { useContext } from 'react'
import { Menu, Button, Container } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import ActivityStore from '../../app/stores/activityStore';

const NavBar = () => {

    const activityStore = useContext(ActivityStore);
    const { openCreateForm } = activityStore;
    
    return (
        <Menu fixed="top" inverted>
            <Container>
                <Menu.Item>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item>Activities</Menu.Item>            
                <Menu.Item>
                    <Button onClick={() => openCreateForm() }  positive content='Create Activity' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export default observer(NavBar)
