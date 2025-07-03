import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
    path: path.join(__dirname, "../.env")
});

const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies;
        if (!token || !token.token) {
            return res.status(401).json({
                message: "Unauthorized access",
                success: false,
            });
        }
        else {
            const decode = jwt.verify(token.token, process.env.SECRET_KEY);
            if (!decode) {
                return res.status(401).json({
                    message: "Unauthorized access",
                    success: false,
                });
            }
            else {
                req.user = { userId: decode.userId };
                next();



            }
        }



    } catch (err) {
        console.error("Error in authentication middleware:", err);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });

    }
}
export default isAuth;
