import { supabase } from './supabase';

// add a tweet
export async function addTweet({ oldTweets, newTweet, userId }) {
  let imageUrl = '';
  if (newTweet.image.length > 0) {
    const fileType = newTweet.image[0].type.split('/').at(1);

    let imageName = `tweet_${Date.now()}_${newTweet.image[0].name}.${fileType}`;

    imageUrl = `https://yaaogiaydxorcvfwehkh.supabase.co/storage/v1/object/public/tweet_images/${imageName}`;

    const image = await uploadImage({
      image: newTweet.image[0],
      bucketName: 'tweet_images',
      imageName: imageName,
    });
  }

  const date = new Date();

  const tweet = {
    id: `${userId}-${Date.now()}`,
    publisher_id: userId,
    created_at: date,
    visibility: newTweet.visibility,
    content: newTweet.content,
    image: imageUrl.length > 0 ? imageUrl : '',
    hashtags: newTweet.hashtags,
    comments: [],
    retweets: [],
    likes: [],
    saves: [],
  };

  const { data, error } = await supabase
    .from('profiles')
    .update({ tweets: [tweet, ...oldTweets] })
    .eq('id', userId)
    .select();

  if (error) throw new Error(error.message);

  return data;
}

// upload an image
async function uploadImage({ image, imageName, bucketName }) {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(imageName, image, {
      contentType: image.type,
    });

  if (error) throw new Error(error.message);

  return data;
}

// get the tweets of a user the tweets
export async function getTweets(userId) {
  let { data: tweets, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId);

  if (error) throw new Error(error.message);
  return tweets;
}

// BOOKMARK
export async function bookmarkTweet({ oldBookmarks, newBookmark, userId }) {
  // add a check to make sure
  const { data, error } = await supabase
    .from('profiles')
    .update({ bookmarks: [newBookmark, ...oldBookmarks] })
    .eq('id', userId)
    .select();

  if (error) throw new Error(error.message);
  return data;
}

export async function removeTweetFromBookmarks({
  oldBookmarks,
  tweet,
  userId,
}) {
  const filteredBookmarks = oldBookmarks.filter(
    bookmark => bookmark.id !== tweet.id
  );

  const { data, error } = await supabase
    .from('profiles')
    .update({ bookmarks: filteredBookmarks })
    .eq('id', userId)
    .select();

  if (error) throw new Error(error.message);
  return data;
}

export async function notifyUserOfSave({ targetId, tweetId, userId }) {
  // console.log({ targetId, tweetId, userId });
  const { data, error } = await supabase.rpc('save_tweet_and_add_saver', {
    profile_id: targetId,
    tweet_id: tweetId,
    saver_id: userId,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function notifyUserOfUnsave({ targetId, tweetId, userId }) {
  // console.log({ targetId, tweetId, userId });
  const { data, error } = await supabase.rpc('remove_saver_from_tweet', {
    profile_id: targetId,
    tweet_id: tweetId,
    saver_id: userId,
  });

  if (error) throw new Error(error.message);
  console.log(data);
  return data;
}

// LIKE

export async function likeTweet({ oldLikes, newLike, userId }) {
  // add a check to make sure
  const { data, error } = await supabase
    .from('profiles')
    .update({ likes: [newLike, ...oldLikes] })
    .eq('id', userId)
    .select();

  if (error) throw new Error(error.message);
  return data;
}

export async function removeTweetFromLikes({ oldlikes, tweet, userId }) {
  const filteredlikes = oldlikes.filter(like => like.id !== tweet.id);

  const { data, error } = await supabase
    .from('profiles')
    .update({ likes: filteredlikes })
    .eq('id', userId)
    .select();

  if (error) throw new Error(error.message);
  return data;
}

export async function notifyUserOfLike({ targetId, tweetId, userId }) {
  const { data, error } = await supabase.rpc('like_tweet_and_add_liker', {
    profile_id: targetId,
    tweet_id: tweetId,
    liker_id: userId,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function notifyUserOfUnlike({ targetId, tweetId, userId }) {
  const { data, error } = await supabase.rpc('remove_liker_from_tweet', {
    profile_id: targetId,
    tweet_id: tweetId,
    liker_id: userId,
  });

  if (error) throw new Error(error.message);

  return data;
}

const tweet = {
  id: 'random id',
  created_at: 'current time',
  visibility: 'all / followers',
  content: 'the tect content of the tweet',
  image: 'if it was uploaded',
  hashtags: 'all hashtags on the content, if there are any',
  comments: [
    {
      id: 'id of the comment',
      userId: 'the id of the user who commented',
      comment: 'content of the comment',
      commentLikes: [
        {
          id: 'id of the like',
          userId: 'id of the user whoc liked the comment',
        },
      ],
    },
    'another comment',
  ],
  retweets: [],
  likes: [],
  saves: [],
};

// save_tweet_and_add_saver
// { targetId, tweetId, userId }
// b9628375-9682-4879-a408-45e7e2b8b9db
// b9628375-9682-4879-a408-45e7e2b8b9db-1709550668447
// 132c3b53-0015-4992-8dea-990990d6a93b

/*
-- Check if the saver_id exists in the array
 IF old_array ? saver_id::text THEN
    -- Convert the JSON array to a text array, remove the saver_id, and convert it back to a JSON array
    new_array := array_to_json(array_remove(ARRAY(SELECT jsonb_array_elements_text(old_array)), saver_id::text))::jsonb;

    -- Update the JSON column by replacing the old array with the new array
       UPDATE profiles
        SET tweets = jsonb_set(tweets, ARRAY[tweet_index::text, 'saves'], new_array)
        WHERE id = profile_id;
ELSE
    -- If the saver_id doesn't exist, return the old array
    new_array := old_array;
END IF;
        */
