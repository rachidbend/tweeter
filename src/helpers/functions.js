import { Months } from './variables';

export function setPositionSpan(spanRef, toRef, direction) {
  if (direction === 'horizontal') {
    // // 1. get the position of the element we want to go to
    const toRefPosition = toRef.current.offsetLeft;
    // 2. get the width of the elemnt we want to go to (to figure out where the middle of the element is)
    const toRefWidth = toRef.current.offsetWidth;

    // 3. get the width of the span itself to figure out whre it's middle is
    const spanWidth = spanRef.current.offsetWidth;

    // 4. figure out where to go, this is done in the useEffect

    // 5. change the position of the middle of the span to lighn up with the middle of the element we want to go to
    spanRef.current.style.left = `${
      toRefPosition + toRefWidth / 2 - spanWidth / 2
    }px`;
  } else if (direction === 'vertical') {
    // // 1. get the position of the element we want to go to
    const toRefPosition = toRef.current.offsetTop;

    // 2. get the width of the elemnt we want to go to (to figure out where the middle of the element is)
    const toRefHeight = toRef.current.offsetHeight;
    // 3. get the width of the span itself to figure out whre it's middle is
    const spanHeight = spanRef.current.offsetHeight;

    // 4. figure out where to go, this is done in the useEffect

    // 5. change the position of the middle of the span to lighn up with the middle of the element we want to go to
    spanRef.current.style.top = `${
      toRefPosition + toRefHeight / 2 - spanHeight / 2
    }px`;
  }
}

export function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(0) + 'm';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'k';
  } else {
    return num.toString();
  }
}

export function formatDate(date) {
  const publishingDate = new Date(date);
  const publishingText = `${publishingDate.getDate()} ${
    Months[publishingDate.getMonth()]
  } at ${publishingDate.getHours()}:${publishingDate.getMinutes()}`;

  return publishingText;
}

function isItemInArray(item, array) {
  return array?.some(element => element.id === item.id);
}

export function tweetState(tweet, userProfile) {
  const isSaved = isItemInArray(tweet, userProfile?.bookmarks);

  const isLiked = isItemInArray(tweet, userProfile?.likes);
  const isRetweeted = userProfile?.retweets?.includes(tweet.id);

  return { isSaved, isLiked, isRetweeted };
}
