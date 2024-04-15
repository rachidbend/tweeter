import { supabase } from './supabase';

export async function addFollowerToUser({ targetId, followerId }) {
  const { data, error } = await supabase.rpc('add_follower', {
    target_id: targetId,
    follower_id: followerId,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function removeFollowerToUser({ targetId, followerId }) {
  const { data, error } = await supabase.rpc('remove_follower', {
    target_id: targetId,
    follower_id: followerId,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function followUser({
  following,
  newFollowing,
  followingCount,
  userId,
}) {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      following: [newFollowing, ...following],
      following_count: followingCount + 1,
    })
    .eq('id', userId)
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function unfollowUser({
  following,
  unfollowId,
  followingCount,
  userId,
}) {
  const filteredFollowing = following.filter(id => {
    return id !== unfollowId;
  });
  const { data, error } = await supabase
    .from('profiles')
    .update({
      following: filteredFollowing,
      following_count: followingCount - 1,
    })
    .eq('id', userId)
    .select();

  if (error) throw new Error(error.message);

  return data;
}
