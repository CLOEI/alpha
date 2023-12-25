import { FastifyInstance } from "fastify";
import { sign, verify } from "jsonwebtoken";
import { hash, compare } from "bcrypt";
import { userSchema } from "../schema";
import { User } from "../models";

export default async function (fastify: FastifyInstance) {
  fastify.post("/login", async (req, res) => {
    try {
      const body = req.body;
      const { username, password } = await userSchema.login.validate(body);
      const user = await User.findOne({
        where: { username },
      });

      if (user) {
        const valid = await compare(password, user.password);
        if (!valid) {
          res.status(401).send({ message: "Invalid password" });
        }

        const token = sign(
          { userId: user.id, role: user.role },
          process.env.JWT_SECRET!,
          {
            expiresIn: "24h",
          }
        );
        res.send({ token });
      } else {
        res.status(404).send({ message: "User not found" });
      }
    } catch (error: any) {
      res.status(500).send({ message: error.message }); // Belum di handle
    }
  });

  fastify.post("/register", async (req, res) => {
    try {
      const body = req.body;
      const { username, password, role } = await userSchema.register.validate(
        body
      );

      const existingUser = await User.findOne({
        where: { username },
      });

      if (existingUser) {
        res.status(409).send({ message: "Username already exists" });
      } else {
        if (password.length < 6) {
          res
            .status(400)
            .send({ message: "Password must be 6 characters or more" });
        } else {
          const hashedPassword = await hash(password, 10);
          const newUser = await User.create({
            username,
            password: hashedPassword,
            role: role || "user",
          });

          const token = sign(
            { userId: newUser.id, role: newUser.role },
            process.env.JWT_SECRET!,
            {
              expiresIn: "24h",
            }
          );

          res.send({ token });
        }
      }
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  });

  fastify.post("/verify-token", async (req, res) => {
    try {
      const token = req.headers.authorization;

      if (token) {
        const _ = verify(token, process.env.JWT_SECRET!);
        res.send({ valid: true });
      } else {
        res.status(401).send({ valid: false, message: "No token provided" });
      }
    } catch (error: any) {
      res.status(401).send({ valid: false, message: error.message });
    }
  });
}
