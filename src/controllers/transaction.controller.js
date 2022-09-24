import Member from "../models/member.js";
import Book from "../models/book.js";
import Transaction from "../models/transaction.js";
import { v4 as uuidv4 } from "uuid";

export const index = (req, res) => {
  Transaction.findAndCountAll()
    .then((data) => {
      res.send({
        message: "data berhasil ditemukan",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const pinjamBuku = (req, res) => {
  const { code_member, code_buku, tanggal_pinjam, tanggal_kembali } = req.body;

  Member.findOne({
    where: {
      code: code_member,
    },
  })
    .then((dataMember) => {
      if (dataMember.status == false) {
        return res.send({ message: "Member sedang terkena penalty" });
      }

      console.log(dataMember);

      Book.findOne({
        where: {
          code: code_buku,
        },
      })
        .then((dataBook) => {
          if (dataBook.stock == 0) {
            return res.send({ message: "stock buku habis" });
          }
          const total = dataBook.stock - 1;
          Book.update(
            {
              stock: total,
            },
            {
              where: {
                code: dataBook.code,
              },
            }
          )
            .then(() => {
              Transaction.create({
                code_transaksi: uuidv4(),
                code_member,
                code_buku,
                tanggal_pinjam,
                tanggal_kembali,
              })
                .then(() => {
                  res
                    .send(res.send({ message: "transaksi berhasil" }))
                    .status(200);
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
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

export const pengembalianBuku = (req, res) => {
  const { id, code_buku } = req.params;

  Book.findOne({
    where: {
      code: code_buku,
    },
  })
    .then((dataBook) => {
      const total = dataBook.stock + 1;

      Book.update(
        {
          stock: total,
        },
        {
          where: {
            code: dataBook.code,
          },
        }
      )
        .then(() => {
          Transaction.destroy({ where: { id } });
        })
        .then(() => {
          res.send({ message: "buku berhasil dikembalikan" });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
