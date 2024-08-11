import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", '');

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied please login" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Attach the decoded user information to the request object
        next();
    } catch (err) {
        res.status(401).json({ message: "Token is not valid" });
    }
};
