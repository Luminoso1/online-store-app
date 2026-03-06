import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Select,
  SimpleGrid,
  Textarea,
  useDisclosure,
  useToast,
  VStack
} from '@chakra-ui/react'
import { useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { createOne } from '../../api/products'
import { useNavigate } from 'react-router-dom'

const UNITS = ['UNITS', 'POUNDS', 'LITERS']
const CATEGORIES = [
  'VEGETABLES',
  'FRUITS',
  'CLEANERS',
  'DAIRIES',
  'PROTEIN',
  'BEANS',
  'SNACKS'
]

export const CreateProductModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = useRef(null)
  const navigate = useNavigate()
  const toast = useToast()
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      name: '',
      price: '',
      quantity: '',
      unit: '',
      category: '',
      image: null,
      comments: ''
    }
  })

  const onSubmit = async (data) => {
    const formData = new FormData()
    const { image, ...res } = data
    formData.append('image', image)
    formData.append('data', JSON.stringify(res))

    await createOne(formData)

    navigate('.', { replace: true })

    try {
      toast({
        title: 'Product created',
        description: "We've created your product for you.",
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    } catch (error) {
      toast({
        title: 'Error creating product',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  return (
    <>
      <Button onClick={onOpen} colorScheme='green'>
        Create
      </Button>
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size='2xl'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <VStack
              spacing={8}
              as='form'
              onSubmit={handleSubmit(onSubmit)}
              bg='white'
              p={8}
              borderRadius='lg'
            >
              <Heading size='lg' color='blue.600'>
                Create New Product
              </Heading>

              <FormControl isInvalid={errors.image}>
                <FormLabel>Product Image</FormLabel>
                <Controller
                  name='image'
                  control={control}
                  rules={{ required: 'Image is required' }}
                  render={({ field: { onChange, value, ...field } }) => (
                    <Input
                      type='file'
                      accept='image/*'
                      onChange={(e) => onChange(e.target.files[0])}
                      p={1}
                      {...field}
                    />
                  )}
                />
                <FormErrorMessage>
                  {errors.image && errors.image.message}
                </FormErrorMessage>
              </FormControl>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w='full'>
                <FormControl isInvalid={errors.name}>
                  <FormLabel>Product Name</FormLabel>
                  <Controller
                    name='name'
                    control={control}
                    rules={{
                      required: 'Name is required',
                      minLength: {
                        value: 3,
                        message: 'Minimum length should be 3'
                      }
                    }}
                    render={({ field }) => (
                      <Input {...field} placeholder='Enter product name' />
                    )}
                  />
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.price}>
                  <FormLabel>Price</FormLabel>
                  <Controller
                    name='price'
                    control={control}
                    rules={{
                      required: 'Price is required',
                      min: { value: 0, message: 'Price must be positive' }
                    }}
                    render={({ field }) => (
                      <NumberInput min={0}>
                        <NumberInputField
                          {...field}
                          placeholder='Enter price'
                        />
                      </NumberInput>
                    )}
                  />
                  <FormErrorMessage>
                    {errors.price && errors.price.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.quantity}>
                  <FormLabel>Stock</FormLabel>
                  <Controller
                    name='quantity'
                    control={control}
                    rules={{
                      required: 'stock is required',
                      min: { value: 0, message: 'quantity must be positive' }
                    }}
                    render={({ field }) => (
                      <NumberInput min={0}>
                        <NumberInputField
                          {...field}
                          placeholder='Enter stock quantity'
                        />
                      </NumberInput>
                    )}
                  />
                  <FormErrorMessage>
                    {errors.quantity && errors.quantity.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.unit}>
                  <FormLabel>Unit</FormLabel>
                  <Controller
                    name='unit'
                    control={control}
                    rules={{ required: 'Unit is required' }}
                    render={({ field }) => (
                      <Select {...field} placeholder='Select unit'>
                        {UNITS.map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </Select>
                    )}
                  />
                  <FormErrorMessage>
                    {errors.unit && errors.unit.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={errors.category}
                  gridColumn={{ md: 'span 2' }}
                >
                  <FormLabel>Category</FormLabel>
                  <Controller
                    name='category'
                    control={control}
                    rules={{ required: 'Category is required' }}
                    render={({ field }) => (
                      <Select {...field} placeholder='Select category'>
                        {CATEGORIES.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </Select>
                    )}
                  />
                  <FormErrorMessage>
                    {errors.category && errors.category.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={errors.comments}
                  gridColumn={{ md: 'span 2' }}
                >
                  <FormLabel>Comments</FormLabel>
                  <Controller
                    name='comments'
                    control={control}
                    rules={{
                      maxLength: {
                        value: 500,
                        message: 'Comments cannot exceed 500 characters'
                      }
                    }}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        placeholder='Add any additional comments about the product'
                        rows={4}
                        resize='none'
                      />
                    )}
                  />
                  <FormErrorMessage>
                    {errors.comments && errors.comments.message}
                  </FormErrorMessage>
                </FormControl>
              </SimpleGrid>

              <Button
                type='submit'
                colorScheme='blue'
                size='lg'
                w='full'
                mt={4}
                isLoading={isSubmitting}
              >
                Create Product
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
