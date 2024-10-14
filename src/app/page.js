"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { fetchArtworks } from '../lib/api';
import Title from '../components/Title';
import ArtworkItem from '../components/ArtworkItem';
import LoadingOverlay from '../components/LoadingOverlay';
import Button from '../components/Button';
import styles from './style.module.scss';

const ARTWORKS_PER_PAGE = 3;
const MAX_PAGE = Math.floor(10000 / ARTWORKS_PER_PAGE);

export default function Home() {
  const [artworks, setArtworks] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingStatus, setLoadingStatus] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchArtworksData = useCallback(async () => {
    setError(null);
    try {
      const fetchedArtworks = await fetchArtworks(page);
      if (fetchedArtworks.length === ARTWORKS_PER_PAGE) {
        setArtworks(fetchedArtworks);
        setLoadingStatus(new Array(fetchedArtworks.length).fill(true));
      } else {
        throw new Error(`Expected ${ARTWORKS_PER_PAGE} artworks, but received: ${fetchedArtworks.length}`);
      }
    } catch (error) {
      setError(error.message);
      console.error('Error fetching artworks:', error);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchArtworksData();
  }, [fetchArtworksData]);

  useEffect(() => {
    if (isLoading) {
      setPage(prevPage => (prevPage < MAX_PAGE ? prevPage + 1 : 1));
    }
  }, [isLoading]);

  const handleShuffleClick = useCallback(() => {
    if (!isLoading) {
      setIsLoading(true);
    }
  }, [isLoading]);

  const handleImageLoad = (index) => {
    setLoadingStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[index] = false;
      return newStatus;
    });
  };

  const allLoaded = loadingStatus.every(status => !status); // Check if all artworks are loaded

  if (error) {
    return <div className={styles.errorMessage}>Error: {error}</div>;
  }

  return (
    <div className={styles.homePageContainer}>
      <div className={styles.homePageTitle}>
        <Title as="h1" size='large'>Rijksmuseum shuffle</Title>
      </div>
      <div className={styles.homePageGallery}>
        <div className={styles.gallery}>
          {artworks.map((art, index) => (
            <ArtworkItem
              key={art.objectNumber}
              art={art}
              onImageLoad={() => handleImageLoad(index)}
            />
          ))}
          {isLoading || !allLoaded ? <LoadingOverlay /> : null}
        </div>
      </div>
      <div className={styles.homePageButton}>
        <Button onClick={handleShuffleClick} disabled={isLoading}>
          {'Shuffle Art'}
        </Button>
      </div>
    </div>
  );
}
