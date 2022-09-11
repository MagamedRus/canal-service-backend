import axios from "axios";
import { JSON_PLACEHOLDER_URL, ROUTE_USERS } from "../constants/server.js";
import users from "../db/users.js";

class UserController {
  async #getUserData(userId) {
    let result = null;
    await axios
      .get(`${JSON_PLACEHOLDER_URL}${ROUTE_USERS}/${userId}`)
      .then((res) => {
        result = res.data;
      });

    return result;
  }

  async getUser(req, res) {
    const body = req.body;
    try {
      const { userId } = body;
      if (!userId) {
        res.status(400).json({ message: "userId is required!" });
      } else {
        const userData = await this.#getUserData(user.id);
        if (!userData?.id) {
          res.status(404).json({ message: "User data is not found!" });
        } else {
          res.json({ userData });
        }
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e });
    }
  }

  async loginUser(req, res) {
    const body = req.body;
    try {
      const { login, password } = body;
      if (!login || !password) {
        res.status(400).json({ message: "login and password are required!" });
      } else {
        let [user] = users?.filter((el) => el.login === login);
        if (!user || user.password !== password) {
          res.status(401).json({ message: "Bad auth" });
        } else {
          const userData = await this.#getUserData(user.id);
          if (!userData?.id) {
            res.status(500).json({ message: "User data is not found!" });
          } else {
            res.json({ userData });
          }
        }
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: e });
    }
  }
}

export default UserController;
