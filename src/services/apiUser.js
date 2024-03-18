import { uploadImage } from './apiTweet';
import { supabase } from './supabase';

export async function getUserData(userID) {
  if (userID === undefined) return null;
  let { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userID);

  if (error) throw new Error(error.message);

  return profiles.at(0);
}

// UPDATE user data (avatar and background images, username, and user description)
export async function getAccountRecommendations() {
  const { data, error } = await supabase.rpc('get_user_recommendations', {});

  if (error) throw new Error(error);

  return data;
}

export async function updateUser({
  username,
  description,
  avatarImage,
  backgroundImage,
  userID,
}) {
  let avatarImgUrl;
  let backgroundImageUrl;

  if (avatarImage.length > 0) {
    const fileType = avatarImage[0].type.split('/').at(1);

    let avatarImageName = `tweet_${Date.now()}_${
      avatarImage[0].name
    }.${fileType}`;

    avatarImgUrl = `https://yaaogiaydxorcvfwehkh.supabase.co/storage/v1/object/public/user_images/${avatarImageName}`;

    const image = await uploadImage({
      image: avatarImage[0],
      bucketName: 'user_images',
      imageName: avatarImageName,
    });
  }

  if (backgroundImage.length > 0) {
    const fileType = backgroundImage[0].type.split('/').at(1);

    let BackgroundImageName = `tweet_${Date.now()}_${
      backgroundImage[0].name
    }.${fileType}`;

    backgroundImageUrl = `https://yaaogiaydxorcvfwehkh.supabase.co/storage/v1/object/public/user_images/${BackgroundImageName}`;

    const image = await uploadImage({
      image: backgroundImage[0],
      bucketName: 'user_images',
      imageName: BackgroundImageName,
    });
  }

  let query = {};

  // if the user added both avatar and background images
  if (avatarImage.length > 0 && backgroundImage.length > 0)
    query = {
      user_name: username,
      user_description: description,
      avatar_image: avatarImage.length > 0 ? avatarImgUrl : '',

      background_image: backgroundImage.length > 0 ? backgroundImageUrl : '',
    };
  // if the user changed only the avatar image
  else if (avatarImage.length > 0 && backgroundImage.length === 0)
    query = {
      user_name: username,
      user_description: description,
      avatar_image: avatarImgUrl,
    };
  // if the user changed only the background image
  else if (avatarImage.length === 0 && backgroundImage.length > 0)
    query = {
      user_name: username,
      user_description: description,
      background_image: backgroundImageUrl,
    };
  // if the user did not change the andy of the images
  else if (avatarImage.length === 0 && backgroundImage.length === 0)
    query = {
      user_name: username,
      user_description: description,
    };

  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...query,
    })
    .eq('id', userID)
    .select();

  if (error) throw new Error(error.message);

  return data;
}

// Delete image
export async function deleteImage({ bucketName, imageUrl }) {
  // get the name of the image from the url
  const splitUrl = imageUrl.split(`/${bucketName}/`);
  // remove the image from the correct bucket
  const { data, error } = await supabase.storage
    .from(bucketName)
    .remove([splitUrl[1]]);

  if (error) throw new Error(error.message);

  return data;
}

export async function getUserToFollow({ userId }) {
  let { data: profiles, error } = await supabase
    .from('profiles')
    .select(
      `
    id,
    user_name,
    user_description,
    avatar_image, 
    background_image, 
    followers_count
  `
    )
    .eq('id', userId);

  if (error) throw new Error(error.message);

  return profiles[0];
}
