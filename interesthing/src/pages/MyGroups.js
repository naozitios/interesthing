import { useEffect,useState } from 'react'
import GroupList from '../components/groupList'
        

const MyGroups = () => {
  const [groups, setGroups] = useState()
  useEffect(() => {
    const fetchGroups = async () => {
        const response = await fetch('http://localhost:8080/get-all-groups-by-joined')
        const json = await response.json()
    
        if (response.ok) {
            console.log(json)
            setGroups(json)
        } else {
            console.log('failed')
        }
      }
    fetchGroups()
}, []);

  return (
    <div className="flex flex-row flex-wrap gap-7 align-items-center justify-content-center p-7">
      {groups && groups.map(group => (
          <GroupList group={group} key={group.Group_id.S} />
      ))}
    </div>
  )
}

export default MyGroups