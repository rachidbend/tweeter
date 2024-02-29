import toast from 'react-hot-toast';
import { supabase } from './supabase';

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

async function uploadImage({ image, imageName, bucketName }) {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(imageName, image, {
      contentType: image.type,
    });

  if (error) throw new Error(error.message);

  return data;
}

export async function getTweets(userId) {
  let { data: tweets, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId);

  if (error) throw new Error(error.message);
  return tweets;
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
