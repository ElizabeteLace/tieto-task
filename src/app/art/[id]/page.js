"use client";
import { useEffect, useState } from 'react';
import { fetchArtworkDetails } from '../../../lib/api';
import Link from 'next/link';
import Title from '@/components/Title';
import BackButton from '@/components/BackButton';
import styles from '../[id]/style.module.scss';
import ArtInfo from '@/components/ArtworkInfo'

export default function ArtDetails({ params }) {
  const { id } = params;
  const [artDetails, setArtDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getArtDetails = async () => {
      try {
        const data = await fetchArtworkDetails(id);
        setArtDetails(data);
      } catch (err) {
        setError('Failed to fetch artwork details');
      } finally {
        setLoading(false);
      }
    };

    getArtDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!artDetails) {
    return (
    <div>
      <BackButton text="Back to Gallery"/>
      <p>Artwork details not found.</p>
    </div>
  );
  }

  return (
    <div className={styles.artPage}>
      <BackButton text="Back to Gallery"/>
      <div className={styles.artPageGrid}>
      <Title as="h1" size="large">{artDetails.title}</Title>
      <div className={styles.imageContainer}>
        {artDetails.webImage ? (
          <img
            src={artDetails.webImage.url}
            alt={artDetails.title}
            className={styles.image}
          />
        ) : (
          <p className={styles.noImage}>No image available for this artwork.</p>
        )}
      </div>
        <p className={styles.description}>{artDetails.plaqueDescriptionEnglish || 'No description available.'}</p>
      <ArtInfo artDetails={artDetails}/>
    </div>
  </div>
  );
}
