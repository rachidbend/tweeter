import styled from 'styled-components';
import PublishTweet from '../features/tweeting/PublishTweet';
import HashtagTrends from '../ui/HashtagTrends';
import { useGetTimeline } from '../hooks/useGetTimeline';
import toast from 'react-hot-toast';
import TweetView from '../features/tweetView/TweetView';
import WhoToFollow from '../ui/WhoToFollow';
import { useEffect, useRef, useState } from 'react';
import HomeSkeletal from '../ui/SkeletalUI/home/HomeSkeletal';
import TweetViewSkeletal from '../ui/SkeletalUI/tweet/TweetViewSkeletal';
import HomeTweetContainer from '../ui/HomeTweetContainer';

const StyledHome = styled.div`
  min-height: 100vh;
  min-height: 100svh;

  display: grid;
  grid-template-columns: 1fr 30.6rem;
  gap: 2.5rem;

  justify-content: center;

  margin-top: 2.5rem;

  width: min(var(--content-max-width), 100% - var(--page-padding-large) * 2);
  margin-inline: auto;

  @media screen and (max-width: 450px) {
    gap: 0;
    width: min(100% - var(--page-padding-small) * 2);
    margin-inline: auto;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    margin-top: 1.469rem;
  }
`;

const MainContent = styled.div``;
const SideContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 2.2rem;

  @media screen and (max-width: 450px) {
    display: none;
  }
`;

function Home() {
  return (
    <StyledHome>
      <MainContent>
        <PublishTweet />
        <HomeTweetContainer />
      </MainContent>
      <SideContent>
        <HashtagTrends />
        <WhoToFollow />
      </SideContent>
    </StyledHome>
  );
}

export default Home;

/*
steps to replicating the on scroll functionality

- 1) modify the Supabase function
    
    in the case of tweets timeline, 
    - the first time we call the function, we get a predefined limit of tweets that we will get, which is 3, so we get back the most recent 3 tweets from the tweets accounts that a user is following
    - after that, we provide the function with the 'created_at' timestamp of the last tweet we got, so that using where clause and a condition that checks for the tweets that are older than the timestamp it got, it returns the next 3 tweets after the last one in in the first time
    - any other calls after that work the same, it gets the last tweets 'created_at' timestamp, and returns the 3 next oldest tweets
    
    the code doing the comparison and the cutting is this part 
    WHERE (tweets->>'created_at')::timestamp AT TIME ZONE 'UTC' < last_created_tweet::timestamp AT TIME ZONE 'UTC'

    and the code limiting the number of results is this 
    LIMIT tweets_limit


    so to replicate the functionality
    add a where clause that compares a consistent value, like 'created_at' timestamp, and add a limit to it, and the function must get that value from the last tweet, to return the next tweets, as well as the limit value, so that it would be easier to change

- 2) modify the custom hook to use ‘useInfiniteQuery’

  in the case of tweets timeline, 
  - the custom hook to fetch the data uses the 'useInfiniteQuery' to enable infinit scrolling, it returns 'fetchNextPage' which is the function that triggers the fetching of the next page, it also returns 'isFetching' which is a boolean, which allows renderng of a spinner to indicate that loading is heppening. 
  - after the queryFn, we have to add 'getNextPageParam', which will be used to ditermin the paramiter to fetch the next page, it can pass a 'pageParam' to the queryFn, and in turn the fetching function, which will include the parameters to use to fetch the next page, it may be a simple page number or curser
  but in this case, it is used to return the last page which will include the most recently fetched array of tweets, which includes the last tweets which will be userd to help fetch the next page, as explained in the first section. but if the last page is null, meaning there are no results, we return undefined to indicate to the 'useInfiniteQuery' that there are no more pages to fetch, which in turn will stop it from fetching other pages


- 3) modify the API function to use the pageParams to fetch the next page or batch of data

  in the case of tweets timeline,
  - the API function gets 'pageParam' from the 'useInfiniteQuery' as explained in the previous section, which will contain the data returned in the last page, which is an array of the last fetched tweets, we use it to get the 'created_at' value from the last tweet, and pass it to the supabase function.
  - if this function was called for the first time, it tells it to the supabase function by sending an empty string in the place of 'last_created_tweet'.
  - if there are no more tweets to fetch, the supabase function returns null, and in turn the API function returns null, indicating to 'useInfiniteQuery' that there are no more pages to fetch.

- 4) modifying the component that displays the data, to call the next page of data and display it 

  in the case of tweets timeline
  - the Home component, which renders the results of the fetching, uses the Intersection observer API to observe a hidden element that always comes at the end of the displayed tweets, once that element is observed in the view port, the 'fetchNextPage' is triggered
  - to make sure this works well, the observer is created inside the home page, so that it would have access to the 'fetchNextPage' function, and is provided the hidden element named Sentinal in a useEffect to make sure that the element exists before it is observed by the Intersection observer, and once it is observed, the useEffect calls the unobserve function to avoid calling the observe function multiple times which may cause some issues or errors.
  - once there is some data, the Home component renders it, and when the user scrolls down to the end of the list and the sentinal element is observed, the next page is fetched, and while fetching is spinner is shown to the user, after the fetching is completed, if there is a new page, the tweets inside it are rendered, if there is nothing, or a null value, an empty  string is retured to avoid errors.


*/
