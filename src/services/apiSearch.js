import { supabase } from './supabase';

export async function searchTweets(searchQuery) {
  const query = searchQuery.split(' ').join(' & ');
  const { data, error } = await supabase.rpc('search_tweets', {
    query: query,
  });

  if (error) throw new Error(error.message);

  return data;
}
