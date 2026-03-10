import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Select,
  Table,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure
} from '@chakra-ui/react'
import { ChevronLeft } from './history'
import { EditIcon } from '../components/icons/edit'
import { useLoaderData } from 'react-router-dom'
import { formatPrice } from '../utils/format'
import { useSearchParams } from 'react-router-dom'
import { CreateProductModal } from '../components/cards/creat-product-modal'
import { useRef } from 'react'
import { useState } from 'react'
import { EditProductModal } from '../components/cards/Edit-product-modal'

export default function ProductsPage() {
  const { products, pagination } = useLoaderData()
  const [searchParams, setSearchParams] = useSearchParams()

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose
  } = useDisclosure()
  const ref = useRef(null)
  const [productSelected, setProductSelected] = useState()

  const currentPage = Number(searchParams.get('page'))
  const pageSize = Number(searchParams.get('size')) || pagination.size

  const handlePageChange = (page) => {
    setSearchParams({ page, size: pageSize })
  }

  console.log(pagination)
  
  return (
    <>
      <CreateProductModal />
      <EditProductModal
        product={productSelected}
        isOpen={isEditOpen}
        onClose={onEditClose}
        editRef={ref}
      />
      <Box minH='500px' overflowX='auto' mt='3'>
        <Table variant='simple'>
          <Thead bg='gray.50'>
            <Tr>
              <Th>ID</Th>
              <Th>Preview</Th>
              <Th textAlign='center'>Name</Th>
              <Th textAlign='center'>Price</Th>
              <Th textAlign='center'>Stock</Th>
              <Th textAlign='center'>Unit</Th>
              <Th textAlign='center'>Category</Th>
              <Th textAlign='center'>Comments</Th>
              <Th textAlign='center'>Actions</Th>
            </Tr>
          </Thead>

          <Tbody>
            {products.length
              ? products.map(
                  ({
                    id,
                    name,
                    price,
                    image,
                    quantity,
                    category,
                    unit,
                    comments
                  }) => (
                    <Tr key={id} _hover={{ bg: 'gray.50' }}>
                      <Td>{id}</Td>
                      <Td>
                        <Box boxSize='14' overflow='hidden'>
                          <Image src={image} alt={name} />
                        </Box>
                      </Td>
                      <Td textAlign='center'>{name}</Td>
                      <Td textAlign='center'>{formatPrice(price)}</Td>
                      <Td textAlign='center'>{quantity}</Td>
                      <Td textAlign='center'>
                        <Tag size='md' colorScheme='gray' borderRadius='full'>
                          {unit}
                        </Tag>
                      </Td>
                      <Td textAlign='center'>
                        <Tag size='md' colorScheme='gray' borderRadius='full'>
                          {category}
                        </Tag>
                      </Td>
                      <Td textAlign='center'>Fresh ...</Td>
                      <Td textAlign='center'>
                        <IconButton
                          isRound={true}
                          variant='solid'
                          colorScheme='transparent'
                          aria-label='Edit product'
                          icon={<EditIcon color='#3182CE' />}
                          onClick={() => {
                            setProductSelected({
                              id,
                              name,
                              price,
                              image,
                              quantity,
                              category,
                              unit,
                              comments
                            })
                            onEditOpen()
                          }}
                        />
                      </Td>
                    </Tr>
                  )
                )
              : Array.from({ length: 5 }).map((_, index) => (
                  <Tr key={index} _hover={{ bg: 'gray.50' }}></Tr>
                ))}
          </Tbody>
        </Table>
      </Box>

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
    </>
  )
}
