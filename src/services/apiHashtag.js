import { supabase } from './supabase';

export async function getTrendyHashtags() {
  let { data: hashtags, error } = await supabase
    .from('hashtags')
    .select('*')
    .range(0, 5)
    .order('number_of_tweets', { ascending: false });

  if (error) throw new Error(error.message);

  return hashtags;
}
