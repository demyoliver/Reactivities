import React from 'react'
import { Menu, Button, Container } from 'semantic-ui-react'

interface IProps {
    openCreateActivity: () => void;
}

const NavBar: React.FC<IProps> = ({openCreateActivity}) => {

    return (
        <Menu fixed="top" inverted>
            <Container>
                <Menu.Item>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item>Activities</Menu.Item>            
                <Menu.Item>
                    <Button onClick={() => openCreateActivity() }  positive content='Create Activity' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export default NavBar
