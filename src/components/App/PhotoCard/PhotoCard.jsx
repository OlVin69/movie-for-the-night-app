import s from "./PotoCard.module.css";

const PhotoCard = ({ item, onImgClick }) => {
  return (
    <div className={s.container}>
      <img className={s.img} src={item.urls.small} alt={item.alt_description} onClick={()=>onImgClick(item.urls.regular)} />
      <div className={s.infowraper}>
        
          <p className={s.info}>Author: {item.user.name}</p>
        
          <p className={s.info}>Likes: {item.likes}</p>
      
      </div>
    </div>
  );
};

export default PhotoCard;
