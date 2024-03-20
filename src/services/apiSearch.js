import { supabase } from './supabase';

export async function searchTweets({ searchQuery, filter }) {
  const query = searchQuery.split(' ').join(' & ');
  const { data, error } = await supabase.rpc('search_tweets', {
    query: query,
    filter: filter,
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
