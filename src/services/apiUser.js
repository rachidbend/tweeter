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

export async function getAccountRecommendations() {
  const { data, error } = await supabase.rpc('get_user_recommendations', {});

  if (error) throw new Error(error);

  return data;
}
