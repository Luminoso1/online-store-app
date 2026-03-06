import { Container } from '@chakra-ui/react'
import Header from '../common/header'
import { Outlet } from 'react-router-dom'

export default function Root() {
  return (
    <>
      <Header />

      <Container as='main' maxW='7xl' w='full'>
        <Outlet />
      </Container>

      {/* footer */}
    </>
  )
}
