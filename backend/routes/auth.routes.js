import express from "express";
import passport from "../utils/passport.js";

const router = express.Router();

// Step 1: Start authentication
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Step 2: Callback from Google
router.get("/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    session: true,
  }),
  (req, res) => {
    res.redirect("http://localhost:5173"); // Or your dashboard
  }
);

// Step 3: Logout
router.get("/logout", (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).send("Logout failed");
    res.redirect("/");
  });
});

export default router;
