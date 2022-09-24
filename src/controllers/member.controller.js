import Member from "../models/member.js";

export const index = (req, res) => {
  Member.findAndCountAll({
    attributes: ["code", "name"],
  })
    .then((member) => {
      res.send({
        message: "Success",
        data: member,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const find = (req, res) => {
  const { code } = req.params;

  Member.findOne({
    attributes: ["code", "name", "status"],
    where: { code },
  })
    .then((member) => {
      if (!member) {
        return res
          .send({
            message: "Data member tidak ditemukan",
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
  const { code, name } = req.body;

  if (!code || !name) {
    return res.send({
      message: "Periksa kembali form yang anda isi!!",
    });
  }

  const member = {
    code,
    name,
  };

  Member.create(member)
    .then((dataMember) => {
      res
        .send({
          message: "Success",
          data: dataMember,
        })
        .status(200);
    })
    .catch((err) => {
      res.send(err).status(400);
    });
};

export const update = (req, res) => {
  const { code } = req.params;
  const { name } = req.body;

  Member.findOne({
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
      Member.update(
        {
          name,
        },
        { where: { code } }
      )
        .then(() => {
          res
            .send({
              message: "Success",
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

  Member.findOne({
    where: { code },
  })
    .then((member) => {
      if (!member) {
        return res
          .send({
            message: "Data yang ingin anda hapus tidak ditemukan !!!",
          })
          .status(404);
      }
      Member.destroy({ where: { code } })
        .then(() => {
          res.send({
            message: "Success",
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

export const sendPenalty = (req, res) => {
  const { code } = req.params;

  Member.update(
    {
      status: false,
    },
    { where: { code } }
  )
    .then(() => {
      res.send({ message: "Berhasil memberikan penalty" });
    })
    .catch((err) => {
      console.log(err);
    });
};
