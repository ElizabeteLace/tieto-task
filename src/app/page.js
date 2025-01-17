"use client";
import React, { useEffect, useState, useCallback } from "react";
import { fetchArtworks } from "../lib/api";
import Title from "../components/Title";
import ArtworkItem from "../components/ArtworkItem";
import LoadingOverlay from "../components/LoadingOverlay";
import Button from "../components/Button";
import styles from "./style.module.scss";

const ARTWORKS_PER_PAGE = 3;
const MAX_ARTWORKS = 10000;
const MAX_PAGE = Math.floor(MAX_ARTWORKS / ARTWORKS_PER_PAGE);

const getRandomPage = () => Math.floor(Math.random() * MAX_PAGE) + 1;

export default function Home() {
  const [artworks, setArtworks] = useState([]);
  const [page, setPage] = useState(getRandomPage);
  const [loadingStatus, setLoadingStatus] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchArtworksData = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    setLoadingStatus(new Array(ARTWORKS_PER_PAGE).fill(true));
    try {
      const fetchedArtworks = await fetchArtworks(page);
      if (fetchedArtworks.length === ARTWORKS_PER_PAGE) {
        setArtworks(fetchedArtworks);
      } else {
        throw new Error(
          `Expected ${ARTWORKS_PER_PAGE} artworks, but received: ${fetchedArtworks.length}`
        );
      }
    } catch (error) {
      setError(error.message);
      console.error("Error fetching artworks:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchArtworksData();
  }, [fetchArtworksData]);

  const handleShuffleClick = useCallback(() => {
    setPage(getRandomPage());
  }, []);

  const handleImageLoad = (index) => {
    setLoadingStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[index] = false;
      return newStatus;
    });
  };

  const allImagesLoaded = loadingStatus.every((status) => !status);

  if (error) {
    return <div className={styles.errorMessage}>Error: {error}</div>;
  }

  return (
    <div className={styles.homePageContainer}>
      <div className={styles.homePageTitle}>
        <Title as="h1" size="large">
          Rijksmuseum shuffle
        </Title>
      </div>
      <div className={styles.homePageGallery}>
        <div className={styles.gallery}>
          {artworks.map((art, index) => (
            <ArtworkItem
              key={`${art.objectNumber}-${page}`}
              art={art}
              onImageLoad={() => handleImageLoad(index)}
            />
          ))}
          {(isLoading || !allImagesLoaded) && <LoadingOverlay />}
        </div>
      </div>
      <div className={styles.homePageButton}>
        <Button
          onClick={handleShuffleClick}
          disabled={isLoading || !allImagesLoaded}
        >
          {"Shuffle Art"}
        </Button>
      </div>
    </div>
  );
}
