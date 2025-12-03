import { gqlRequest } from "./client";

export const ProductAPI = {
  async getAll() {
    const res = await gqlRequest(`
      query {
        products { id name price image }
      }
    `);
    return res.products;
  },
  async create(name: string, price: number, image?: string) {
    return gqlRequest(
      `
      mutation ($input: CreateProductInput!) {
        createProduct(input: $input) { id name price image }
      }
      `,
      { input: { name, price, image } }
    );
  },

  async update(id: string, name: string, price: number, image?: string) {
    return gqlRequest(
      `
      mutation ($input: UpdateProductInput!) {
        updateProduct(input: $input) { id name price image }
      }
      `,
      { input: { id, name, price, image } }
    );
  },

  async delete(id: string) {
    return gqlRequest(`
      mutation {
        deleteProduct(id: "${id}")
      }
    `);
  },
};
