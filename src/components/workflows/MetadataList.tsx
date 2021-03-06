import styles from './MetadataList.module.scss'
import React from 'react'

export default function MetadataList (props: {
  title: string
  data: Map<string, string>
}) {
  return (
    <>
      <p>{props.title}</p>
      <ul>
        {Array.from(props.data.entries()).map(([key, value]) => {
          return (
            <li key={key} className={styles.label}>{key}: {value}</li>
          )
        })}
      </ul>
    </>
  )
}
