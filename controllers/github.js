import axios from "axios"

export const getGithubUser = async (req, res, next) => {
  try {
    const { username } = req.params

    if (!username) {
      return res.status(400).json({ message: "Username is required" })
    }

    const response = await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    })

    res.status(200).json(response.data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return res.status(404).json({ message: "GitHub user not found" })
      }
      console.error("Error getting GitHub user:", error.response?.data || error.message)
      return res.status(error.response?.status || 500).json({
        message: error.response?.data?.message || "Error getting GitHub user",
      })
    }
    console.error("Unexpected error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

