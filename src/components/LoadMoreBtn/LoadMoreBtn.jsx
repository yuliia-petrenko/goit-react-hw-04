import css from './LoadMoreBtn.module.css'

const LoadMoreBtn = ({ children, onClick, disabled }) => {
  return (
    <div className={css.btn}>
      <button className={css.loadMoreBtn} onClick={onClick} disabled={disabled}>{children}</button>
    </div>
      
       
  )
}

export default LoadMoreBtn