import css from './LoadMoreBtn.module.css';

export default function LoadMoreBtn({ loadMore }){
  return (
    <button className={css.loadMoreBtn} onClick={loadMore}>
      Load More
    </button>
  );
};

