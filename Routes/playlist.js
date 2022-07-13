const express = require("express");
const finduser = require("../middleware/finduser");
const router = express.Router();

const Lists = require("../models/List");

//Creating a new Public Playlist
router.post("/createNewPlayListPublic/:movieId", finduser, async (req, res) => {
  try {
    const { title, poster } = req.body;
    if (!title) {
      return res
        .status(422)
        .json({ error: "please fill all the required feild" });
    }
    const list = new Lists({
      user: req.user.id,
      name: req.user.name,
      title,
      poster,
      List: [req.params.movieId],
      type: "public",
    });
    console.log(list);
    await list.save();

    res.status(200).json({ message: "movie added to playlist successfully" });
  } catch (error) {
    console.log(error);
  }
});

//creating a new private playlist
router.post(
  "/createNewPlayListPrivate/:movieId",
  finduser,
  async (req, res) => {
    try {
      console.log(req.user.name);
      console.log(req.user.id);
      const { title, poster } = req.body;
      if (!title) {
        return res
          .status(422)
          .json({ error: "please fill all the required feild" });
      }
      console.log(req.params.movieId);
      const list = new Lists({
        user: req.user.id,
        name: req.user.name,
        title,
        poster,
        List: [req.params.movieId],
        type: "private",
      });
      // console.log(list);
      await list.save();

      res.status(200).json({ message: "movie added to playlist successfully" });
    } catch (error) {
      console.log(error);
    }
  }
);

//adding to a existing list
router.put("/addToPlaylist/:id", finduser, async (req, res) => {
  try {
    let movieId = req.body.movieID;
    let list = await Lists.findById(req.params.id);
    console.log(list);
    list.List.push(movieId);
    const resx = await list.save();
    console.log(resx);

    if (!list) {
      return res.status(404).send("Noass");
    }
    if (list.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    res.status(200).json({ message: "movie added to playlist successfully" });
  } catch (error) {
    console.log(error);
  }
});

//finding content of a lists
router.get("/fetchlistsbyuser/:id/:title", finduser, async (req, res) => {
  const lists = await Lists.find({
    id: req.params.id,
    title: req.params.title,
  });
  res.json(lists);
});

//finding lists which are public(for home page)
router.get("/fetchlists/public", finduser, async (req, res) => {
  const lists = await Lists.find({
    type: "public",
  });
  res.json(lists);
});

//finding list by user
router.get("/fetchlists", finduser, async (req, res) => {
  const lists = await Lists.find({
    user: req.user.id,
  });
  console.log(lists);
  res.json(lists);
});

module.exports = router;
