const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const fetchProducts = async (category = '') => {
  const url = category ? `${API_URL}/products?category=${category}` : `${API_URL}/products`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
};

export const fetchProductByIdOrSlug = async (idOrSlug) => {
  const res = await fetch(`${API_URL}/products/${idOrSlug}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
};

export const fetchCategories = async () => {
  const res = await fetch(`${API_URL}/categories`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
};

export const submitEnquiry = async (data) => {
  const res = await fetch(`${API_URL}/enquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to submit enquiry');
  return res.json();
};

export const fetchSiteContent = async () => {
  const res = await fetch(`${API_URL}/content`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch content');
  return res.json();
};

export const fetchExhibitions = async () => {
  const res = await fetch(`${API_URL}/content/exhibitions`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error('Failed to fetch exhibitions');
  return res.json();
};

export const fetchTestimonials = async () => {
  const res = await fetch(`${API_URL}/content/testimonials`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error('Failed to fetch testimonials');
  return res.json();
};
