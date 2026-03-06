import { useToast } from '@chakra-ui/react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCartStore = create(
  persist((set, get) => ({
      items: [],
      add: (product, quantityBuy = 1) => {
        set((state) => ({
          items: [...state.items, { ...product, quantityBuy }]
        }))
      },

      remove: (id) => {
        set((state) => ({
          items: state.items.filter((product) => product.id !== id)
        }))
      },

      getQuantity: (id) => {
        const { items } = get()
        return items.find((item) => item.id === id)?.quantityBuy || 0
      },

      increase: (id, quantity = 1) => {
        set((state) => {
          const updatedItems = state.items.map((item) => {
            if (item.quantityBuy >= item.quantity) {
              throw new Error(
                `Only ${item.quantity} ${item.name} are available`
              )
            }
            return item.id === id
              ? { ...item, quantityBuy: item.quantityBuy + quantity }
              : item
          })

          return { items: updatedItems }
        })
      },

      decrease: (id, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((p) => p.id === id)

          if (existingItem.quantityBuy === 1) {
            return { items: state.items.filter((item) => item.id !== id) }
          }

          return {
            items: state.items.map((item) =>
              item.id === id
                ? { ...item, quantityBuy: item.quantityBuy - quantity }
                : item
            )
          }
        })
      },

      getTotalPrice: () => {
        const { items } = get()
        return items.reduce(
          (total, item) => total + item.price * item.quantityBuy,
          0
        )
      },

      clear: () => set({ items: [] })
    }),
    {
      name: 'cart'
    })
)

const useCart = () => {
  const toast = useToast()
  const {
    items,
    add,
    remove,
    getQuantity,
    increase,
    decrease,
    getTotalPrice,
    clear
  } = useCartStore()

  const handleError =
    (fn) =>
    (...args) => {
      try {
        return fn(...args)
      } catch (error) {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      }
    }

  return {
    items: items,
    addItem: handleError(add),
    removeItem: handleError(remove),
    getItemQuantity: handleError(getQuantity),
    increaseQuantity: handleError(increase),
    decreaseQuantity: handleError(decrease),
    getTotalPrice: handleError(getTotalPrice),
    clearCart: handleError(clear)
  }
}

export default useCart
