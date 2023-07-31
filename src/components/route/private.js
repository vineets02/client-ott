import { useState, useEffect } from "react"
import { useAuth } from "../../context/auth"
import { Outlet } from "react-router-dom"
import axios from "axios"
import Spinner from "../Spinner"

export default function PrivateRoute() {
  const [ok, setOk] = useState(false)
  const [auth, setAuth] = useAuth()
  const privateApi = "http://139.59.14.25/api/v1/auth/user-auth"

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(privateApi, {
        headers: {
          Authorization: auth?.token,
        },
      })
      if (res.data.ok) {
        setOk(true)
      } else {
        setOk(false)
      }
    }
    if (auth?.token) authCheck()
  }, [auth?.token])

  return ok ? <Outlet /> : <Spinner />
}
