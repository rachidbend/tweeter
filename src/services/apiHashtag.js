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

export async function updateOrCreateHashtag({ hashtag, tweetId, publisherId }) {
  let { data, error } = await supabase.rpc('update_or_create_hashtag', {
    hashtag: hashtag,
    tweet_id: tweetId,
    publisher_id: publisherId,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function removeTweetFromHashtag({
  hashtag,
  tweetId,
  publisherId,
}) {
  let { data, error } = await supabase.rpc('remove_tweet_from_hashtag', {
    hashtag: hashtag,
    tweet_id: tweetId,
    publisher_id: publisherId,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getMatchingHashtags(query) {
  let { data, error } = await supabase.rpc('get_matching_hastags', {
    query: query,
  });

  if (error) throw new Error(error.message);

  return data;
}
