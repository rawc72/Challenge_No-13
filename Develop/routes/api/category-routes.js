const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      {
        model: Product,
        as: "products",
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((category) => {
      res.send(category);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the Category.",
      });
    });
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const id = req.params.id;

  Category.findByPk(id, {
    include: [
      {
        model: Product,
        as: "products",
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((category) => {
      res.send(category);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the Category.",
      });
    });
});

router.post("/", (req, res) => {
  // create a new category
  // Validate request
  if (!req.body.category_name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const category = {
    category_name: req.body.category_name,
  };

  Category.create(category)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Category.",
      });
    });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  const id = req.params.id;

  Category.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Category was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Category with id=" + id,
      });
    });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  const id = req.params.id;

  Category.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Category was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Category with id=${id}. Maybe Category was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Category with id=" + id,
      });
    });
});

module.exports = router;
