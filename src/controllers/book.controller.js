import Book from "../models/book.js";

export const index = (req, res) => {
  Book.findAndCountAll({
    attributes: ["code", "title", "author", "stock"],
  })
    .then((book) => {
      res.send({
        message: "Success",
        data: book,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const find = (req, res) => {
  const { code } = req.params;

  Book.findOne({
    attributes: ["code", "title", "author", "stock"],
    where: { code },
  })
    .then((member) => {
      if (!member) {
        return res
          .send({
            message: "Data buku tidak ditemukan",
          })
          .status(404);
      }
      res.send({
        message: "Success",
        data: member,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const create = (req, res) => {
  const { code, title, author, stock } = req.body;

  if (!code || !title || !author || !stock) {
    return res.send({
      message: "Periksa kembali form yang anda isi!!",
    });
  }

  const book = {
    code,
    title,
    author,
    stock,
  };

  Book.create(book)
    .then((dataBook) => {
      res
        .send({
          message: "Success",
          data: dataBook,
        })
        .status(200);
    })
    .catch((err) => {
      res.send(err).status(400);
    });
};

export const update = (req, res) => {
  const { code } = req.params;
  const { title, author, stock } = req.body;

  Book.findOne({
    where: { code },
  })
    .then((id) => {
      if (!id) {
        return res
          .send({
            message: "data yang anda ingin update tidak ditemukan",
          })
          .status(404);
      }
      Book.update(
        {
          title,
          author,
          stock,
        },
        { where: { code } }
      )
        .then(() => {
          res
            .send({
              message: "data berhasil di update",
            })
            .status(200);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const destroy = (req, res) => {
  const { code } = req.params;

  Book.findOne({
    where: { code },
  })
    .then((book) => {
      if (!book) {
        return res
          .send({
            message: "Data yang ingin anda hapus tidak ditemukan !!!",
          })
          .status(404);
      }
      Book.destroy({ where: { code } })
        .then(() => {
          res.send({
            message: "data berhasil dihapus",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
