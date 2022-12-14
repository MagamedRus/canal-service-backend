import axios from "axios";
import {
  JSON_PLACEHOLDER_URL,
  ROUTE_POSTS,
  ROUTE_USERS,
  ROUTE_PHOTOS,
} from "../constants/server.js";

class PostController {
  async #getPostData(userId) {
    let result = null;
    await axios
      .get(`${JSON_PLACEHOLDER_URL}${ROUTE_POSTS}?userId=${userId}`)
      .then((res) => {
        result = res.data;
      });

    return result;
  }

  async #getImages() {
    let result = null;
    await axios.get(`${JSON_PLACEHOLDER_URL}${ROUTE_PHOTOS}`).then((res) => {
      result = res.data.map((el) => el.thumbnailUrl);
    });

    return result;
  }

  async #getUserData(userId) {
    let result = null;
    await axios
      .get(`${JSON_PLACEHOLDER_URL}${ROUTE_USERS}/${userId}`)
      .then((res) => {
        result = res.data;
      });

    return result;
  }

  async #getFinishedPosts(posts, userId) {
    const userData = await this.#getUserData(userId);
    const photos = await this.#getImages();
    const finishedPosts = posts.map((post, index) => ({
      ...post,
      author: userData.name,
      company: userData.company?.name,
      img: photos[index],
    }));

    return finishedPosts;
  }

  async getPosts(req, res) {
    const query = req.query;
    try {
      const { userId } = query;
      if (!userId) {
        res.status(400).json({ message: "userId is required!" });
      } else {
        let posts = await this.#getPostData(userId);
        if (!posts[0]) {
          res.status(500).json({ message: "User data is not found!" });
        } else {
          const finishedPublics = await this.#getFinishedPosts(posts, userId);
          res.json({ posts: finishedPublics });
        }
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e });
    }
  }
}

export default PostController;
