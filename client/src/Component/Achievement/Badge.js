import React, { useEffect, useState } from 'react';
import NoBadge from './NoBadge';
import { getUserDetail } from '../Functionality/GetUserDetail';
import { getSingleUserDetail } from '../ApiFunctions/getAllCourses';
import ImageGallery from './ImageGallary';

const Badge = () => {
  const myImagePaths = [
    "./Image/Badges/Badge1.png",
    "./Image/Badges/Badge2.png",
    "./Image/Badges/Badge3.png",
    "./Image/Badges/Badge4.png",
    "./Image/Badges/Badge5.png",
    "./Image/Badges/Badge6.png",
    "./Image/Badges/Badge7.png",
    "./Image/Badges/Badge8.png",
    "./Image/Badges/Badge9.png",
  ];
  const [badges, setBadges] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const detail = getUserDetail();
      const UserDetail = await getSingleUserDetail(detail.email);
      setBadges(UserDetail.badges);
    };
    fetchData();
  }, [1]);

  if (badges === 0) {
    return <NoBadge />;
  }

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <ImageGallery ImagePath={myImagePaths.slice(0, badges)} />
    </div>
  );
}

export default Badge;
