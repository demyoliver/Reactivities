import React from 'react'
import { Menu, Button, Container } from 'semantic-ui-react'

export const  NavBar  = () => {

    return (
        <Menu inverted>
            <Container>
            <Menu.Item>
                <img src="/assets/logo.png" alt="logo"/>
                Reactivities
            </Menu.Item>
            <Menu.Item>Activities</Menu.Item>
            />
            <Menu.Item>
                <Button positive content='Create Activity' />
            </Menu.Item>
            </Container>
        </Menu>
    )
}
