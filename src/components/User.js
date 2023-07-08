const User = ({ user }) => {
  console.log(`user: ${JSON.stringify(user)}`)
  if (!user) {
    return null
  }

  const listBlogs = () => {
    if (!user.blogs || user.blogs.length === 0) {
      return <div>{`${user.name} does not have any blogs`}</div>
    }

    return (
      <div>
        <h3>added blogs</h3>
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div>
      <h2>{user.name}</h2>
      {listBlogs()}
    </div>
  )
}

export default User
