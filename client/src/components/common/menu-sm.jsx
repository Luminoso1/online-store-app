import {
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Icon,
  useDisclosure
} from '@chakra-ui/react'
import { useRef } from 'react'
import { MenuIcon } from '../icons/menu'

export default function Menu() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  return (
    <>
      <Button
        ref={btnRef}
        onClick={onOpen}
        bg='transparent'
        border='1px'
        rounded='full'
        w='10'
        height='10'
      >
        <Icon as={MenuIcon} boxSize={6} />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody>
            <Container
              p='0'
              display='flex'
              flexDir='column'
              gap='12'
            ></Container>
          </DrawerBody>

          <DrawerFooter flexDir='column'></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
