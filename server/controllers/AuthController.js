import getPrismaInstance from "../utils/PrismaClient.js";

export const checkUser = async (req, res, next) => {
  try {
    const email = req.body.email;
    if (!email) {
      res.json({ msg: "Email is required", status: false });
    }
    const prisma = getPrismaInstance();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.json({ msg: "User not found", status: false });
    } else {
      return res.json({ msg: "User found", status: true, data: user });
    }
  } catch (error) {
    next(error);
  }
};

export const onBoardUser = async (req, res, next) => {
  try {
    const { email, name, image: profilePicture, about } = req.body;
    if (!email || !name || !profilePicture) {
      return res.send("Email, name and image are required.");
    }
    const prisma = getPrismaInstance();
    await prisma.user.create({
      data: { email, name, profilePicture, about },
    });
    return res.json({ msg: "Success", status: true });
  } catch (error) {}
};
