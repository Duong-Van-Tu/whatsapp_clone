import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaCamera } from 'react-icons/fa';
import ContextMenu from './ContextMenu';
import PhotoPicker from './PhotoPicker';
import PhotoLibrary from './PhotoLibrary';
import CapturePhoto from './CapturePhoto';

function Avatar({ type, image, setImage }) {
  const [hover, setHover] = useState(false);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [contextMenuCoordinates, setContextMenuCoordinates] = useState({
    x: 0,
    y: 0,
  });
  const [grapPhoto, setGrapPhoto] = useState(false);
  const [showPhotoLibrary, setShowPhotoLibrary] = useState(false);
  const [showCapturePhoto, setShowCapturePhoto] = useState(false);

  const contextMenuOptions = [
    {
      name: 'Take Photo',
      callback: () => {
        setShowCapturePhoto(true);
      },
    },
    {
      name: 'Choose Form Library',
      callback: () => {
        setShowPhotoLibrary(true);
      },
    },
    {
      name: 'Upload Photo',
      callback: () => {
        setGrapPhoto(true);
      },
    },
    {
      name: 'Remove Photo',
      callback: () => {
        setImage('/default_avatar.png');
      },
    },
  ];

  const showContextMenu = (e) => {
    e.preventDefault();
    setContextMenuCoordinates({ x: e.pageX, y: e.pageY });
    setIsContextMenuVisible(true);
  };

  const PhotoPickerChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const data = document.createElement('img');
    reader.onload = function (event) {
      data.src = event.target.result;
      data.setAttribute('data-src', event.target.result);
    };
    reader.readAsDataURL(file);
    setTimeout(() => {
      setImage(data.src);
    }, 100);
  };

  useEffect(() => {
    if (grapPhoto) {
      const data = document.getElementById('photo-picker');
      data.click();
      document.body.onfocus = (e) => {
        setTimeout(() => {
          setGrapPhoto(false);
        }, 500);
      };
    }
  }, [grapPhoto]);

  return (
    <>
      <div className="flex items-center justify-center">
        {type === 'sm' && (
          <div className="relative h-10 w-10">
            <Image src={image} alt="avatar" className="rounded-full" fill />
          </div>
        )}
        {type === 'lg' && (
          <div className="relative h-14 w-14">
            <Image src={image} alt="avatar" className="rounded-full" fill />
          </div>
        )}
        {type === 'xl' && (
          <div
            className="relative cursor-pointer z-0"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div
              className={`z-10 bg-photopicker-overlay-background h-60 w-60 absolute top-0 left-0 flex items-center rounded-full justify-center flex-col text-center gap-2
            ${hover ? 'visible' : 'hidden'}
          `}
              id="context-opener"
              onClick={(e) => showContextMenu(e)}
            >
              <FaCamera className="text-2xl" />
              <span>
                Change
                <br />
                Profile
                <br />
                Photo
              </span>
            </div>
            <div className="flex items-center justify-center h-60 w-60">
              <Image src={image} alt="avatar" className="rounded-full" fill />
            </div>
          </div>
        )}
      </div>
      {isContextMenuVisible && (
        <ContextMenu
          options={contextMenuOptions}
          coordinates={contextMenuCoordinates}
          contextMenu
          setContextMenu={setIsContextMenuVisible}
        />
      )}
      {showCapturePhoto && (
        <CapturePhoto setImage={setImage} hide={setShowCapturePhoto} />
      )}
      {grapPhoto && <PhotoPicker onChange={PhotoPickerChange} />}
      {showPhotoLibrary && (
        <PhotoLibrary
          setImage={setImage}
          hidePhotoLibrary={setShowPhotoLibrary}
        />
      )}
    </>
  );
}

export default Avatar;
