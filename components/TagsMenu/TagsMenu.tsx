import Link from 'next/link'
import css from './TagsMenu.module.css'

export default function TagsMenu() {
  const uniqueTags = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping']
  return (
    <>
      <div className={css.menuContainer}>
        <button className={css.menuButton}>Notes ▾</button>
        <ul className={css.menuList}>
          <li key='All' className={css.menuItem}>
            <Link href={`/notes/filter/All`} className={css.menuLink}>
              All
            </Link>
          </li>
          {uniqueTags.map(tag => {
            return (
              <li key={tag} className={css.menuItem}>
                <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                  {tag}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
