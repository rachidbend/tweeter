import { supabase } from './supabase';

export async function getUserData(userID) {
  let { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userID);

  if (error) throw new Error(error.message);

  return profiles.at(0);
}
