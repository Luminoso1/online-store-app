import FetchData from ".";

let productsCache = new Map()

export const getAll = async (page = 1, size = 100) => {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const cacheKey = `${page}-${size}`
  if(productsCache.has(cacheKey)) return productsCache.get(cacheKey)

  const data = await FetchData(
    `/products/all?page=${page}&size=${size}`,
    "GET",
  );

  productsCache.set(cacheKey, data);

  return data;
};

export const getByCategoryAndName = async (category, name) => {
  return await FetchData(`/products/${category}/${name}`);
};

export const createOne = async (data) => {
  return await FetchData("/products/create", "POST", data);
};

export const editProduct = async (data) => {
  return await FetchData("/products/edit", "PUT", data);
};
