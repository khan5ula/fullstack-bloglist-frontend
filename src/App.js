import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoginForm from './components/LoginForm'
import Menu from './components/Menu'
import Notification from './components/Notification'
import User from './components/User'
import Users from './components/Users'
import { initializeBlogs } from './reducers/blogReducer'
import { getUsers, setUser } from './reducers/userReducer'

import { Col, Container, Row } from 'react-bootstrap'
import { Route, Routes, useMatch } from 'react-router-dom'
import Blog from './components/Blog'
import BlogList from './components/BlogList'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.currentUser)
  const matchUser = useMatch('/users/:id')
  const matchBlog = useMatch('/blogs/:id')
  const users = useSelector((state) => state.user.allUsers)
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [dispatch])

  const viewUser = matchUser
    ? users.find((a) => a.id === matchUser.params.id)
    : null

  const viewBlog = matchBlog
    ? blogs.find((a) => a.id === matchBlog.params.id)
    : null

  if (user === null) {
    return (
      <Container style={{ marginTop: '10px' }}>
        <Row>
          <Col xs={1} md={4}></Col>
          <Col xs={10} md={4}>
            <Notification />
            <LoginForm />
          </Col>
          <Col xs={1} md={4}></Col>
        </Row>
      </Container>
    )
  }

  return (
    <Container style={{ marginTop: '10px' }}>
      <Row>
        <Col xs={1} md={2}></Col>
        <Col>
          <Menu user={user} />
          <Notification />
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User user={viewUser} />} />
            <Route path="/blogs/:id" element={<Blog blog={viewBlog} />} />
            <Route path="/" element={<BlogList />} />
            <Route path="/blogs" element={<BlogList />} />
          </Routes>
        </Col>
        <Col xs={1} md={2}></Col>
      </Row>
    </Container>
  )
}

export default App
