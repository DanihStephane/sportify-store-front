export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  categoryId: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductResponse {
  status: number;
  message: string;
  data: {
    pagination: {
      totalDocs: number;
      totalPages: number;
      hasPrevPage: boolean;
      hasNextPage: boolean;
      page: number;
      limit: number;
    };
    data: Product[];
  };
}
