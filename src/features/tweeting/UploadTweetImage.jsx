/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { IconImageOutline } from '../../styles/Icons';
import { useRef } from 'react';

const Image = styled.label`
  display: flex;
  align-items: center;
  margin-right: 0.967rem;
`;
const ImageIcon = styled(IconImageOutline)`
  height: 2rem;
  width: 2rem;
  color: var(--color-grey-400);
  cursor: pointer;

  transition: color var(--transition-200);
  &:hover {
    color: var(--color-blue-100);
  }
`;
const UploadImage = styled.input`
  height: 1px;
  width: 1px;
  visibility: hidden;
`;

function UploadTweetImage({ register, onImageChange }) {
  function handleImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      let img = URL.createObjectURL(e.target.files[0]);
      onImageChange(img);
    }
  }
  const labelRef = useRef(null);

  function handleKeyDown(e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
      e.preventDefault();
      labelRef.current.click();
    }
  }

  return (
    <Image
      role="button"
      tabIndex="0"
      ref={labelRef}
      htmlFor="tweet-image-upload"
      onKeyDownCapture={handleKeyDown}
    >
      <ImageIcon />
      <UploadImage
        id="tweet-image-upload"
        type="file"
        {...register('image', { onChange: handleImageChange })}
      />
    </Image>
  );
}

export default UploadTweetImage;
