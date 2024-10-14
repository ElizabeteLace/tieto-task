import Title from "../Title";
import styles from "./style.module.scss";

const ArtInfoItem = ({ title, content }) => (
  <div className={styles.artInfo}>
    <Title as="h2" size="medium">
      {title}
    </Title>
    <p>
      {content && content.length > 0 ? content : "No description available."}
    </p>
  </div>
);

const ArtInfo = ({ artDetails }) => {
  const infoItems = [
    { title: "Author", content: artDetails?.principalOrFirstMaker },
    { title: "Artwork dating", content: artDetails?.dating?.presentingDate },
  ];

  return (
    <div className={styles.artInfoContainer}>
      {infoItems.map((item, index) => (
        <ArtInfoItem key={index} title={item.title} content={item.content} />
      ))}
    </div>
  );
};

export default ArtInfo;
