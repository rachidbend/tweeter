/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { Button, ButtonText } from './TweetView';
import { useSaveTweet } from '../../hooks/tweet/save/useSaveTweet';
import { useNotifyUserOfSave } from '../../hooks/tweet/save/useNotifyUserOfSave';
import { useRemoveTweetFromBookmarks } from '../../hooks/tweet/save/useRemoveTweetFromBookmarks';
import { useNotifyUserOfUnsave } from '../../hooks/tweet/save/useNotifyUserOfUnsave';
import { IconBookMark, IconBookMarkOutline } from '../../styles/Icons';

const SaveIconFull = styled(IconBookMark)`
  height: 2rem;
  width: 2rem;
  color: inherit;
`;
const SaveIconOutline = styled(IconBookMarkOutline)`
  height: 2rem;
  width: 2rem;
  color: inherit;
`;

function TweetSaveButton({ isSaved, tweet }) {
  // Bookmark handlers
  const { saveTweet } = useSaveTweet();
  const { notifyUserOfSave } = useNotifyUserOfSave();
  const { removeFromSaves } = useRemoveTweetFromBookmarks();
  const { notifyUserOfUnsave } = useNotifyUserOfUnsave();

  function handleSave() {
    saveTweet(
      { newBookmark: tweet },
      {
        onSuccess: () => {
          notifyUserOfSave({ targetId: tweet.publisher_id, tweetId: tweet.id });
        },
      }
    );
  }
  function handleRemoveSave() {
    removeFromSaves(
      { tweet: tweet },
      {
        onSuccess: () => {
          notifyUserOfUnsave({
            targetId: tweet.publisher_id,
            tweetId: tweet.id,
          });
        },
      }
    );
  }

  return (
    <Button
      onClick={isSaved ? handleRemoveSave : handleSave}
      $isSaved={isSaved}
    >
      {isSaved ? <SaveIconFull /> : <SaveIconOutline />}

      <ButtonText>{isSaved ? 'Saved' : 'Save'}</ButtonText>
    </Button>
  );
}

export default TweetSaveButton;
