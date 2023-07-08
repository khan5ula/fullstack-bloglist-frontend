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
              <td style={{ paddingRight: '20px' }}>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
