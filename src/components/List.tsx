import React from 'react'

const List: ({ list }: {list: string[];}) => JSX.Element = ({list}) => {
  return (
      <>        
        <ul>
            {
                list.map(item => <li key={item.toString()}>{item}</li>)
            }
        </ul>
      </>
  )
}

export default List