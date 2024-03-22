import styled from 'styled-components';
import PublishTweet from '../features/tweeting/PublishTweet';
import HashtagTrends from '../ui/HashtagTrends';
import { useGetTimeline } from '../hooks/useGetTimeline';
import Spinner from '../ui/Spinner';
import toast from 'react-hot-toast';
import TweetView from '../features/tweetView/TweetView';
import WhoToFollow from '../ui/WhoToFollow';
import { useEffect, useRef, useState } from 'react';

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

const TweetsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 2.4rem;
`;

const Sentinal = styled.div`
  background-color: transparent;
  height: 0px;
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Home() {
  // a sentinal ref is used to provide the intersection observer with the element to observe
  const sentinalRef = useRef();

  // custome hook to fetch the data of the page line, and to enable infinite scrolling
  const { timeline, isLoading, error, fetchNextPage, isFetching } =
    useGetTimeline();

  // the intersection observer
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      // if the query if fetching the data, do not do anything
      if (isFetching) return;
      // if the Sentinal element is observed, fetch the next page
      if (entry.isIntersecting) {
        fetchNextPage();
      }
    });
  });

  // this effect is used to controll the intersection observer to avoid some issues
  useEffect(
    function () {
      // the intersection observer is initialised after the Sentinal element is mounted, and after each rerender
      if (sentinalRef.current) {
        observer.observe(sentinalRef?.current);
      }

      // when the Sentinal is observed, the Home page rerenders, abd the observer is disconnected to avoid stacking multiple observers on the same element
      return () => observer.disconnect();
    },
    [sentinalRef.current]
  );

  if (isLoading) return <Spinner />;
  if (error) toast.error(error.message);
  return (
    <StyledHome>
      <MainContent>
        <PublishTweet />
        <TweetsContainer>
          {timeline?.pages.map(page =>
            page === null
              ? ''
              : page.map(tweet => (
                  <TweetView tweet={tweet} key={`timeline${tweet.id}`} />
                ))
          )}

          {isFetching && (
            <SpinnerContainer>
              <Spinner />
            </SpinnerContainer>
          )}
          <Sentinal ref={sentinalRef}></Sentinal>
        </TweetsContainer>
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

/*
1. Modify the Supabase Function:

  -For the first function call, retrieve the most recent 3 tweets from the accounts that a user is following.
  -For subsequent calls, provide the function with the ‘created_at’ timestamp of the last tweet received. The function should then return the next 3 older tweets.
  -The comparison and cutting is done by this part of the code:
  WHERE (tweets->>'created_at')::timestamp AT TIME ZONE 'UTC' < last_created_tweet::timestamp AT TIME ZONE 'UTC'

  -The number of results is limited by this part of the code:
  LIMIT tweets_limit

  -To replicate the functionality, add a WHERE clause that compares a consistent value, like ‘created_at’ timestamp, and add a limit to it. The function should get that value from the last tweet to return the next tweets.
2. Modify the Custom Hook to Use ‘useInfiniteQuery’:

  -The custom hook fetches the data using ‘useInfiniteQuery’ to enable infinite scrolling. It returns ‘fetchNextPage’, which triggers the fetching of the next page, and ‘isFetching’, a boolean that allows rendering of a spinner to indicate loading.
  -After the queryFn, add ‘getNextPageParam’, which determines the parameter to fetch the next page. It can pass a ‘pageParam’ to the queryFn, which will include the parameters to use to fetch the next page.
  -If the last page is null, meaning there are no results, return undefined to indicate to ‘useInfiniteQuery’ that there are no more pages to fetch.
3. Modify the API Function to Use the PageParams to Fetch the Next Page or Batch of Data:

- The API function gets ‘pageParam’ from ‘useInfiniteQuery’, which contains the data returned in the last page. Use it to get the ‘created_at’ value from the last tweet and pass it to the Supabase function.
  -If the function is called for the first time, indicate this to the Supabase function by sending an empty string in place of ‘last_created_tweet’.
  -If there are no more tweets to fetch, the Supabase function returns null, and in turn, the API function returns null, indicating to ‘useInfiniteQuery’ that there are no more pages to fetch.
4. Modify the Component that Displays the Data to Call the Next Page of Data and Display It:

  -The Home component, which renders the results of the fetching, uses the Intersection Observer API to observe a hidden element that always comes at the end of the displayed tweets. Once that element is observed in the viewport, ‘fetchNextPage’ is triggered.
  -To ensure this works well, the observer is created inside the home page, so that it would have access to the ‘fetchNextPage’ function, and is provided the hidden element.
  -Additionally, use the useEffect hook to set up the observer by only initializing it after the element is Sentinal element is mounbted, and clean up the observer by returning a function from the useEffect that disconnects the observer. This ensures that the observer is properly initialized when the component mounts, and cleaned up when it unmounts to prevent memory leaks and errors.
*/
