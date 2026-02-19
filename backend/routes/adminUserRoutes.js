const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const User = require("../models/User");

// GET ALL USERS
router.get("/", auth, role("admin"), async (req,res)=>{
  const users = await User.find().select("-password");
  res.json(users);
});

// CHANGE ROLE
router.put("/role/:id", auth, role("admin"), async (req,res)=>{
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role: req.body.role },
    { new:true }
  );
  res.json(user);
});

// BLOCK USER
router.put("/block/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  user.isBlocked = !user.isBlocked; // toggle block
  await user.save();

  res.json(user);
});

// DELETE USER
router.delete("/:id", auth, role("admin"), async (req,res)=>{
  await User.findByIdAndDelete(req.params.id);
  res.json({message:"User Deleted"});
});

module.exports = router;
