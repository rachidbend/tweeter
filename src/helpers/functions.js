export function setPositionSpan(spanRef, toRef) {
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
}
