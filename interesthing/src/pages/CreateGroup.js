import { useEffect,useState } from 'react'

const CreateGroup = () => {
  const[courses, setCourses] = useState('')
  const[coursesDefault, setCoursesDefault] = useState('')
  const [input, setInput] = useState('');


  return (
    <div className="home">
      <div className="course-detail">
        <h1>Hello create group</h1>
      </div>
    </div>
  )
}

export default CreateGroup