import { useEffect,useState } from 'react'                               
        

const Home = () => {
  const[courses, setCourses] = useState('')
  const[coursesDefault, setCoursesDefault] = useState('')
  const [input, setInput] = useState('');
  const items = [
    {label: 'Home', icon: 'pi pi-fw pi-home'},
    {label: 'Calendar', icon: 'pi pi-fw pi-calendar'},
    {label: 'Edit', icon: 'pi pi-fw pi-pencil'},
    {label: 'Documentation', icon: 'pi pi-fw pi-file'},
    {label: 'Settings', icon: 'pi pi-fw pi-cog'}
];


  return (
    <div className="home">
      <div className="course-detail">
        <h1>Hello</h1>
      </div>
    </div>
  )
}

export default Home