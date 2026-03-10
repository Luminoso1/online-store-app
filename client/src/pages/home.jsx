import { Suspense } from "react";
import { Categories } from "../components/categories";
import { ProductGrid } from "../components/product-grid";
import { useLoaderData, Await } from "react-router-dom";
import {
  Grid,
  Card,
  CardHeader,
  CardBody,
  Stack,
  Box,
  Skeleton,
} from "@chakra-ui/react";

export default function Home() {
  const data = useLoaderData();

  return (
    <>
      {/* categories */}

      <Categories />

      {/* products */}

      <Suspense fallback={<ProductsFallback />}>
        <Await resolve={data.products}>
          {(products) => <ProductGrid products={products} />}
        </Await>
      </Suspense>
    </>
  );
}

const ProductsFallback = () => {
  return (
    <Grid
      templateColumns="repeat(auto-fit,minmax(240px, 1fr))"
      rowGap="10"
      columnGap="6"
      justifyContent="space-between"
      mt="20"
    >
      {Array.from({ length: 8 }).map((index) => (
        <Card key={index} w="full" pb="4">
          <CardHeader>
            <Box height="44" overflow="hidden">
              <Skeleton height="100%" width="100%" />
            </Box>
          </CardHeader>

          <CardBody>
            <Stack spacing="3">
              <Skeleton height="24px" width="50%" />
            </Stack>
          </CardBody>
        </Card>
      ))}
    </Grid>
  );
};
