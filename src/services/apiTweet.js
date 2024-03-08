import { supabase } from './supabase';

// add a tweet ///////////////////////////////////////////////
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
    isRetweet: false,
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

// BOOKMARK ///////////////////////////////////////////////
export async function bookmarkTweet({ oldBookmarks, newBookmark, userId }) {
  // add a check to make sure
  const bookmark = {
    id: newBookmark.id,
    publisher_id: newBookmark.publisher_id,
  };
  const { data, error } = await supabase
    .from('profiles')
    .update({ bookmarks: [bookmark, ...oldBookmarks] })
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
  const { data, error } = await supabase.rpc('save_tweet_and_add_saver', {
    profile_id: targetId,
    tweet_id: tweetId,
    saver_id: userId,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function notifyUserOfUnsave({ targetId, tweetId, userId }) {
  const { data, error } = await supabase.rpc('remove_saver_from_tweet', {
    profile_id: targetId,
    tweet_id: tweetId,
    saver_id: userId,
  });

  if (error) throw new Error(error.message);

  return data;
}

// LIKE ///////////////////////////////////////////////

export async function likeTweet({ oldLikes, newLike, userId }) {
  // add a check to make sure
  const like = {
    id: newLike.id,
    publisher_id: newLike.publisher_id,
  };

  const { data, error } = await supabase
    .from('profiles')
    .update({ likes: [like, ...oldLikes] })
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

// RETWEET ///////////////////////////////////////////////
export async function retweet({ oldTweets, newTweet, userId, tweet }) {
  // let imageUrl = '';
  // if (newTweet.image.length > 0) {
  //   const fileType = newTweet.image[0].type.split('/').at(1);

  //   let imageName = `tweet_${Date.now()}_${newTweet.image[0].name}.${fileType}`;

  //   imageUrl = `https://yaaogiaydxorcvfwehkh.supabase.co/storage/v1/object/public/tweet_images/${imageName}`;

  //   const image = await uploadImage({
  //     image: newTweet.image[0],
  //     bucketName: 'tweet_images',
  //     imageName: imageName,
  //   });
  // }

  const date = new Date();
  // the retweet is simply a repost of the original retweet, and not a quote for now (5/3/2024)
  const retweet = {
    id: newTweet.id,
    publisher_id: userId,
    created_at: date,
    visibility: 'all',
    content: '',
    image: '',
    hashtags: newTweet.hashtags,
    comments: [],
    retweets: [],
    likes: [],
    saves: [],
    isRetweet: true,
    originalTweetId: tweet.id,
    originalTweetPublishdeId: tweet.publisher_id,
  };

  const { data, error } = await supabase
    .from('profiles')
    .update({ tweets: [retweet, ...oldTweets] })
    .eq('id', userId)
    .select();

  if (error) throw new Error(error.message);
  return data;
}

export async function getRetweetsIds(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('retweets')
    .eq('id', userId);

  if (error) throw new Error(error.message);

  return data;
}

export async function addRetweetId({ tweetId, oldRetweets, userId }) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ retweets: [tweetId, ...oldRetweets] })
    .eq('id', userId);

  if (error) throw new Error(error.message);

  return data;
}

export async function removeRetweetId({ retweetId, oldRetweets, userId }) {
  const filteredRetweets = oldRetweets?.filter(id => id !== retweetId);
  const { data, error } = await supabase
    .from('profiles')
    .update({ retweets: filteredRetweets })
    .eq('id', userId);

  if (error) throw new Error(error.message);

  return data;
}

export async function notifyUserOfRetweet({
  targetId,
  tweetId,
  userId,
  retweetId,
}) {
  const { data, error } = await supabase.rpc('notify_tweet_of_retweet', {
    tweet_id: tweetId,
    tweeter_id: targetId,
    retweeter_id: userId,
    retweet_id: retweetId,
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function removeTweet({ oldTweets, tweetId, userId }) {
  const filteredTweets = oldTweets.filter(tweet => tweet.id !== tweetId);
  const { data, error } = await supabase
    .from('profiles')
    .update({ tweets: filteredTweets })
    .eq('id', userId)
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function notifyUserOfRetweetRemove({ targetId, tweetId, userId }) {
  const { data, error } = await supabase.rpc(
    'notify_tweet_of_retweet_removal',
    {
      retweeter_id: userId,
      tweet_id: tweetId,
      tweeter_id: targetId,
    }
  );

  if (error) throw new Error(error.message);
  return data;
}

// ///////////////////////////////////////////////

export async function getTweetById({ tweetId, publisherId }) {
  const { data, error } = await supabase.rpc('get_tweet', {
    publisher_id: publisherId,
    tweet_id: tweetId,
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
