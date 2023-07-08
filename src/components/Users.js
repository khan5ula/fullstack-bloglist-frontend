import { useSelector } from 'react-redux'
import React from 'react'

const Users = () => {
  const users = useSelector((state) => state.user.allUsers)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>User</th>
            <th style={{ textAlign: 'left' }}>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={{ paddingRight: '30px' }}>
                {<Link to={`/users/${user.id}`}>{user.name}</Link>}
              </td>
              <td style={{ textAlign: 'right' }}>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
import { Link } from 'react-router-dom'

export default Users
