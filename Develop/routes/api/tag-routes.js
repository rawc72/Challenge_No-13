const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        as: "products",
        through: {
          model: ProductTag,
          attributes: ["id", "product_id", "tag_id"],
        },
        attributes: ["id", "product_name", "price", "stock", "category_id"],
        includeIgnoreAttributes: false,
      },
    ],
  })
    .then((tag) => {
      res.send(tag);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving the Tag.",
      });
    });
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

  const id = req.params.id;

  Tag.findByPk(id, {
    include: [
      {
        model: Product,
        as: "products",
        through: {
          model: ProductTag,
          attributes: ["id", "product_id", "tag_id"],
        },
        attributes: ["id", "product_name", "price", "stock", "category_id"],
        includeIgnoreAttributes: false,
      },
    ],
  })
    .then((tag) => {
      res.send(tag);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving the Tag.",
      });
    });
});

router.post("/", (req, res) => {
  // create a new tag
  if (!req.body.tag_name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const tag = {
    tag_name: req.body.tag_name,
  };

  Tag.create(tag)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Tag.",
      });
    });
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  const id = req.params.id;

  Tag.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tag was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Tag with id=${id}. Maybe Tag was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tag with id=" + id,
      });
    });
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  const id = req.params.id;

  Tag.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tag was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Tag with id=${id}. Maybe Tag was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tag with id=" + id,
      });
    });
});

module.exports = router;
