import { useEffect,useState } from 'react'

const FilterTab = () => {
  const[courses, setCourses] = useState('')
  const[coursesDefault, setCoursesDefault] = useState('')
  const [input, setInput] = useState('');


  return (
    <div className="home">
      <div className="course-detail">
        <h1>Hello filter</h1>
      </div>
    </div>
  )
}

export default FilterTab