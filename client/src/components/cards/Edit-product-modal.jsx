import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
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
  useToast,
  VStack
} from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'
import { editProduct } from '../../api/products'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

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

export const EditProductModal = ({
  product = {},
  isOpen,
  onClose,
  editRef
}) => {
  const toast = useToast()
  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      name: product?.name || '',
      price: product?.price || 0,
      quantity: product?.quantity || 0,
      unit: product?.unit || '',
      category: product?.category || '',
      image: product?.image || null,
      comments: product?.comments || ''
    }
  })

  useEffect(() => {
    if (product) {
      Object.keys(product).forEach((key) => setValue(key, product[key]))
    }
  }, [product, setValue])

  const onSubmit = async (data) => {
    try {
      if (typeof data.image === 'object' && data.image instanceof File) {
        const formData = new FormData()
        const { image, ...res } = data
        formData.append('image', image)
        formData.append('data', JSON.stringify(res))

        await editProduct(formData)
      } else {
        await editProduct(data)
      }
      navigate(`${pathname}${search}`)
      onClose()
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
      <Modal
        finalFocusRef={editRef}
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
                Edit {product.name}
              </Heading>

              <Center gap='10'>
                <Box boxSize='20' overflow='hidden' rounded='lg'>
                  <Image src={product.image} alt={product.name} />
                </Box>
                <FormControl isInvalid={errors.image}>
                  <FormLabel>Product Image</FormLabel>
                  <Controller
                    name='image'
                    control={control}
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
              </Center>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w='full'>
                <FormControl isInvalid={errors.name}>
                  <FormLabel>Product Name</FormLabel>
                  <Controller
                    name='name'
                    control={control}
                    rules={{
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
                      min: { value: 0, message: 'Price must be positive' },
                      validate: (value) =>
                        parseFloat(value) > 0 ||
                        'Price must be a positive number'
                    }}
                    render={({ field }) => (
                      <NumberInput
                        min={0}
                        value={field.value}
                        onChange={(valueString) => field.onChange(valueString)}
                      >
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
                      min: { value: 0, message: 'quantity must be positive' },
                      validate: (value) =>
                        parseFloat(value) > 0 ||
                        'Stock must be a positive number'
                    }}
                    render={({ field }) => (
                      <NumberInput
                        min={0}
                        value={field.value}
                        onChange={(valueString) => field.onChange(valueString)}
                      >
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
                isDisabled={isSubmitting}
              >
                Edit Product
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
