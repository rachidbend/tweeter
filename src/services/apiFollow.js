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

export async function followUser({ following, newFollowing, userId }) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ following: [newFollowing, ...following] })
    .eq('id', userId)
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function unfollowUser({ following, unfollowId, userId }) {
  const filteredFollowing = following.filter(id => {
    console.log(id);
    console.log(unfollowId);
    return id !== unfollowId;
  });
  console.log(filteredFollowing);
  const { data, error } = await supabase
    .from('profiles')
    .update({ following: filteredFollowing })
    .eq('id', userId)
    .select();

  if (error) throw new Error(error.message);

  return data;
}

// this is the function that worked so far for adding a follower to the user, but it has no check to make sure the followe_id does not already exist in the followers array
/*
create
or replace function add_follower (target_id uuid, follower_id uuid) returns JSONB as $$

DECLARE
    old_array JSONB;
    new_array JSONB;
BEGIN
    -- Fetch the existing JSON array
    SELECT followers 
    FROM profiles
    INTO old_array 
    WHERE id = target_id;


    -- Construct a new JSON array with the new follower included
   new_array :=   old_array || jsonb_build_array(follower_id) ;

    -- Update the JSON column by prepending the new item to the existing JSON array
    UPDATE profiles
    SET followers = new_array
    WHERE id = target_id;
   return new_array;
END;
$$ language plpgsql security definer;

*/

// this function is suggested by copilot, it the check that is missing in the above function,  AND IT WORKS
/*
CREATE OR REPLACE FUNCTION add_follower (target_id uuid, follower_id uuid) RETURNS JSONB AS $$
DECLARE
    old_array JSONB;
    new_array JSONB;
BEGIN
    -- Fetch the existing JSON array
    SELECT followers 
    FROM profiles
    INTO old_array 
    WHERE id = target_id;

    -- Check if the follower_id already exists in the array
    IF NOT (old_array ? follower_id::text) THEN
        -- Construct a new JSON array with the new follower included
        new_array := old_array || jsonb_build_array(follower_id);

        -- Update the JSON column by prepending the new item to the existing JSON array
        UPDATE profiles
        SET followers = new_array
        WHERE id = target_id;
    ELSE
        -- If the follower_id already exists, return the old array
        new_array := old_array;
    END IF;

    RETURN new_array;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
*/
