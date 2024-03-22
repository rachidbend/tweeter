import styled from 'styled-components';
import useGetUserTweets from '../../hooks/useGetUserTweets';
import toast from 'react-hot-toast';
import { useEffect, useRef, useState } from 'react';
import Spinner from '../../ui/Spinner';
import TweetView from '../tweetView/TweetView';

const TweetsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.524rem;
`;

const Sentinal = styled.div`
  height: 0;
  background-color: transparent;
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function UserTweetsView({ id, filter }) {
  const [observer, setObserver] = useState(null);
  const sentinalRef = useRef();
  const {
    userTweets,
    isLoading: isLoadingTweets,
    error: tweetsError,
    fetchNextPage,
    isFetching,
  } = useGetUserTweets({ userId: id, filter: filter });

  // const observer = new IntersectionObserver(entries => {
  //   entries.map(entry => {
  //     if (isFetching) return;
  //     if (entry.isIntersecting) {
  //       console.log('is fetching new page');
  //       fetchNextPage();
  //     }
  //   });
  // });

  useEffect(() => {
    // Function to initialize the observer
    const initializeObserver = () => {
      const newObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (isFetching) return;
          if (entry.isIntersecting) {
            console.log('is fetching new page');
            fetchNextPage();
          }
        });
      });

      if (sentinalRef.current) {
        newObserver.observe(sentinalRef.current);
      }

      // Clean up the previous observer before setting the new one
      if (observer) {
        observer.disconnect();
      }

      setObserver(newObserver); // Update the observer state with the new instance
    };

    // Call the function to initialize or update the observer
    initializeObserver();

    // Cleanup function to disconnect the observer when the component unmounts
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [filter, isFetching]); // Depend on filter and isFetching to reinitialize the observer when needed

  if (isLoadingTweets) return <Spinner />;
  if (tweetsError) toast.error(tweetsError.message);

  return (
    <TweetsContainer>
      {userTweets?.pages.map(page =>
        page === null
          ? ''
          : page.map(tweet => <TweetView key={tweet.id} tweet={tweet} />)
      )}
      {isFetching && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}
      <Sentinal ref={sentinalRef}></Sentinal>
    </TweetsContainer>
  );
}

export default UserTweetsView;

// useEffect(() => {
//   // Function to initialize the observer
//   const initializeObserver = () => {
//     const newObserver = new IntersectionObserver(entries => {
//       entries.forEach(entry => {
//         if (isFetching) return;
//         if (entry.isIntersecting) {
//           console.log('is fetching new page');
//           fetchNextPage();
//         }
//       });
//     });

//     if (sentinalRef.current) {
//       newObserver.observe(sentinalRef.current);
//     }

//     // Clean up the previous observer before setting the new one
//     if (observer) {
//       observer.disconnect();
//     }

//     setObserver(newObserver); // Update the observer state with the new instance
//   };

//   // Call the function to initialize or update the observer
//   initializeObserver();

//   // Cleanup function to disconnect the observer when the component unmounts
//   return () => {
//     if (observer) {
//       observer.disconnect();
//     }
//   };
// }, [filter, isFetching]); // Depend on filter and isFetching to reinitialize the observer when needed
