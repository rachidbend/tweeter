import { supabase } from './supabase';

export async function searchTweets({ searchQuery, filter, pageParam }) {
  const query = searchQuery.split(' ').join(' & ');
  const { data, error } = await supabase.rpc('search_tweets', {
    query: query,
    filter: filter,
    page_size: 3,
    page: pageParam,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function searchAccounts({ searchQuery }) {
  const query = searchQuery.split(' ').join(' & ');

  const { data, error } = await supabase.rpc('search_accounts', {
    query: query,
  });

  if (error) throw new Error(error.message);

  return data;
}
