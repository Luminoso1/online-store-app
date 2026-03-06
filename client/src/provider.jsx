import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Box, ChakraProvider, Tab, TabList, Tabs } from '@chakra-ui/react'

import Root from './components/layouts/root'
import Home from './pages/home'
import Product from './pages/product'
import HistoryPage from './pages/history'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import ErrorPage from './error-page'

import ProtectedRoute from './components/protect-routes'

import {
  filteredProductsLoader,
  productLoader,
  productsLoader
} from './loaders/products'
import { cartsLoader, cartUserLoader } from './loaders/cart'

import CheckoutPage from './pages/checkout'
import { ProfilePage } from './pages/profile'
import ProductsPage from './pages/products'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import OrdersPage from './pages/orders'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/register',
        element: <RegisterPage />
      },
      {
        index: true,
        element: <Home />,
        loader: filteredProductsLoader,
        errorElement: <ErrorPage />
      },
      {
        path: ':productsCategory',
        element: <Home />,
        loader: filteredProductsLoader
      },
      {
        path: '/:productsCategory/:productName',
        element: <Product />,
        loader: productLoader
      },
      {
        element: <ProtectedRoute role={['CUSTOMER']} />,
        children: [
          {
            path: '/history',
            element: <HistoryPage />,
            loader: cartUserLoader
          }
        ]
      },
      {
        path: '/settings',
        element: <div>hello</div>
      },
      {
        element: <ProtectedRoute role={['CUSTOMER']} />,
        children: [
          {
            path: '/checkout',
            element: <CheckoutPage />
          }
        ]
      },
      {
        element: <ProtectedRoute role={['CUSTOMER', 'ADMIN']} />,
        children: [
          {
            path: '/profile',
            element: <ProfilePage />
          }
        ]
      },
      {
        element: <ProtectedRoute role={['ADMIN']} />,
        children: [
          {
            path: '/tables',
            element: (
              <Box mt='8'>
                <Tabs colorScheme='blue' mb={6}>
                  <TabList>
                    <Tab>
                      <Link to=''>Products</Link>
                    </Tab>
                    <Tab aria-selected={true}>
                      <Link to='orders'>Orders</Link>
                    </Tab>
                    <Tab>Categories</Tab>
                  </TabList>
                </Tabs>
                <Outlet />
              </Box>
            ),
            children: [
              {
                index: true,
                element: <ProductsPage />,
                loader: productsLoader
              },
              {
                path: 'orders',
                element: <OrdersPage />,
                loader: cartsLoader
              }
            ]
          }
        ]
      }
    ]
  }
])

export default function Provider() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  )
}
