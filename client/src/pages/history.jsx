import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Select,
  Tab,
  Table,
  TabList,
  Tabs,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure
} from '@chakra-ui/react'
import { useLoaderData } from 'react-router-dom'
import formatPrice from '../utils/format-price'
import { formatDate } from '../utils/format'
import { useSearchParams } from 'react-router-dom'
import { ModalProducts } from '../components/cards/modal-products'
import { CancelOrderDialog } from '../components/cards/cancel-order-dialog'
import { useState } from 'react'
import { StopIcon } from '../components/icons/stop'
import { EyeIcon } from '../components/icons/eye'
import { useRef } from 'react'

export default function HistoryPage() {
  const { carts, pagination } = useLoaderData()
  const [searchParams, setSearchParams] = useSearchParams()

  const {
    isOpen: isProductOpen,
    onOpen: onProductOpen,
    onClose: onProductClose
  } = useDisclosure()
  const {
    isOpen: isCancelOpen,
    onOpen: onCancelOpen,
    onClose: onCancelClose
  } = useDisclosure()
  const cancelRef = useRef()
  const [selectedOrder, setSelectedOrder] = useState(null)

  const currentPage = Number(searchParams.get('page'))
  const pageSize = Number(searchParams.get('size')) || pagination.size

  const handlePageChange = (page) => {
    setSearchParams({ page, size: pageSize })
  }

  return (
    <Box mt='8'>
      <Tabs colorScheme='blue' mb={6}>
        <TabList>
          <Tab isSelected>Orders</Tab>
        </TabList>
      </Tabs>
      <Box minH='500px' overflowX='auto'>
        <Table variant='simple'>
          <Thead bg='gray.50'>
            <Tr>
              <Th textAlign='center'>ID</Th>
              <Th textAlign='center'>Date</Th>
              <Th textAlign='center'>State</Th>
              <Th textAlign='center'>Method</Th>
              <Th textAlign='center'>Payment</Th>
              <Th textAlign='center'>Total</Th>
              <Th textAlign='center'>Actions</Th>
            </Tr>
          </Thead>

          <Tbody>
            {carts <= 0
              ? Array.from({ length: 5 }).map((_, index) => (
                  <Tr key={index}></Tr>
                ))
              : carts?.map(
                  ({
                    id,
                    date,
                    state,
                    deliveryMethod,
                    paymentMethod,
                    total,
                    orders
                  }) => {
                    const formatedDate = formatDate(new Date(date))
                    const formatedTotal = formatPrice(total)
                    return (
                      <Tr key={id} _hover={{ bg: 'gray.50' }}>
                        <Td textAlign='center' fontWeight='medium'>
                          {id}
                        </Td>
                        <Td textAlign='center'>{formatedDate}</Td>
                        <Td textAlign='center'>
                          <Tag
                            size='md'
                            colorScheme={
                              state === 'COMPLETED'
                                ? 'green'
                                : state === 'CANCELED'
                                ? 'red'
                                : 'blue'
                            }
                            borderRadius='full'
                          >
                            {state}
                          </Tag>
                        </Td>
                        <Td textAlign='center'>{deliveryMethod}</Td>
                        <Td textAlign='center'>{paymentMethod}</Td>
                        <Td textAlign='center' fontWeight='semibold'>
                          {formatedTotal}
                        </Td>
                        <Td textAlign='center'>
                          <IconButton
                            p='0'
                            isRound={true}
                            variant='solid'
                            colorScheme='trasparent'
                            aria-label='Watch order'
                            icon={<EyeIcon color='#3182CE' />}
                            onClick={() => {
                              setSelectedOrder({ date: formatedDate, orders })
                              onProductOpen()
                            }}
                          />
                          <IconButton
                            isRound={true}
                            variant='solid'
                            colorScheme='trasparent'
                            aria-label='Stop order'
                            icon={<StopIcon color='red' />}
                            onClick={() => {
                              setSelectedOrder({ id })
                              onCancelOpen()
                            }}
                          />
                        </Td>
                      </Tr>
                    )
                  }
                )}
          </Tbody>
        </Table>
      </Box>
      <CancelOrderDialog
        isOpen={isCancelOpen}
        onClose={onCancelClose}
        cancelRef={cancelRef}
        cart={selectedOrder}
      />
      <ModalProducts
        isOpen={isProductOpen}
        onClose={onProductClose}
        cart={selectedOrder}
      />

      <Box px={6} py={4} borderTop='1px' borderColor='gray.100'>
        <Flex
          justify='space-between'
          align={{ base: 'start', md: 'center' }}
          direction={{ base: 'column', md: 'row' }}
          gap={4}
        >
          {/* Total and Lines per page */}
          <HStack spacing={4} mb={{ base: 4, md: 0 }} align='center'>
            <Text color='gray.600'>Total {pagination.total}</Text>
            <HStack spacing={2}>
              <Text color='gray.600'>Lines per page</Text>
              <Select
                size='sm'
                w='70px'
                value={pageSize}
                onChange={(e) =>
                  setSearchParams({ page: 1, size: e.target.value })
                }
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </Select>
            </HStack>
          </HStack>

          {/* Pagination controls */}
          <HStack
            spacing={2}
            wrap='wrap'
            justify={{ base: 'center', md: 'flex-end' }}
          >
            <IconButton
              aria-label='Previous page'
              icon={<ChevronLeft size={18} />}
              size='sm'
              variant='ghost'
              colorScheme='blue'
              onClick={() => handlePageChange(currentPage - 1)}
              isDisabled={pagination.current === 1}
            />
            <Button size='sm' variant='ghost' colorScheme='blue'>
              1
            </Button>
            <Button size='sm' variant='ghost' colorScheme='blue'>
              2
            </Button>
            <Button size='sm' colorScheme='blue'>
              3
            </Button>
            <Button size='sm' variant='ghost' colorScheme='blue'>
              ...
            </Button>
            <Button size='sm' variant='ghost' colorScheme='blue'>
              10
            </Button>
            <IconButton
              aria-label='Next page'
              icon={<ChevronLeft size={18} />}
              boxSize='10'
              size='sm'
              variant='ghost'
              colorScheme='blue'
              onClick={() => handlePageChange(currentPage + 1)}
              isDisabled={pagination.current === pagination.pages}
            />
          </HStack>
        </Flex>
      </Box>
    </Box>
  )
}

export function ChevronLeft(props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='2.5em'
      height='2.5em'
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.5}
        d='m14 16l-4-4l4-4'
      ></path>
    </svg>
  )
}
