import { Button, Card, CardContent, Container, Input, Typography } from '@mui/material'
import { Fragment } from 'react'

const SignIn = () => {

    return (
        <Container
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}
        >
            <Fragment>
                <Card variant='outlined' style={{
                    width: '500px'
                }}>
                    <CardContent
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px'
                        }}
                    >
                        <Typography fontSize={'22px'} >
                           Fazer Login
                        </Typography>
                        <Input
                            autoComplete={'off'}
                            placeholder='Nome de usuário'
                        />
                        <Input
                            autoComplete={'off'}
                            type='password'
                            placeholder='Digite sua senha'
                        />
                        <Button variant='contained'>Logar</Button>
                    </CardContent>
                </Card>
            </Fragment>
        </Container>
    )
}

export default SignIn