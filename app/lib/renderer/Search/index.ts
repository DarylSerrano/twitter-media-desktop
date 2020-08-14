import fetch from 'cross-fetch';
import { User } from '../../../interfaces/User';

const BASE_URL = `http://127.0.0.1:4200/api/users`;

async function makeFetch<T>(url: string) {
  const response = await fetch(url);
  const body: T = await response.json();

  return body;
}

export type SearchAnyParams = {
  page?: number;
  count?: number;
};

const searchAnyuser = async (
  searchInput: string,
  params?: SearchAnyParams
): Promise<User[]> => {
  const url = new URL(`${BASE_URL}/search`);

  url.searchParams.append('q', searchInput);
  if (params?.count) url.searchParams.append('count', params.count.toString());
  if (params?.page) url.searchParams.append('page', params.page.toString());

  return makeFetch<User[]>(url.toString());
};

export type GetUserParams = { userId?: string; screenName?: string };

const getUser = async (param: GetUserParams): Promise<User> => {
  const url = new URL(`${BASE_URL}/show`);

  if (param.userId) url.searchParams.append('user_id', param.userId.toString());
  if (param.screenName)
    url.searchParams.append('screen_name', param.screenName.toString());

  return makeFetch<User>(url.toString());
};

export default { searchAnyuser, getUser };
