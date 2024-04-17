import { supabase } from './supabase';

export async function searchTweets({ searchQuery, filter, pageParam }) {
  // creating the query helps the supabase function to find the terms it needs to look for without having the search terms be next to each other in the results
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

export async function searchAccounts({ searchQuery, pageParam }) {
  // same as in search tweet query but for account names and descriptions
  const query = searchQuery.split(' ').join(' & ');

  const { data, error } = await supabase.rpc('search_accounts', {
    query: query,
    page_size: 10,
    page: pageParam,
  });

  if (error) throw new Error(error.message);

  return data;
}
