import AccountService from "../service/account.service.js";
import Log from "../models/logs.js";

export const createLog = async (req, res) => {
  try {
    const { senderAC, type, recieverAC, amount } = req.body;

    const existinAccount = await AccountService.findAccountByAc(senderAC);

    if (existinAccount) {
      const newLog = new Log({
        senderAC: senderAC,
        type: type,
        recieverAC: recieverAC,
        amount: amount,
      });

      await newLog
        .save()
        .then(async () => {
          const senderAccount = await AccountService.findAccountByAc(senderAC);
          const afterAmount = await AccountService.balanceAmount(
            senderAccount.amount,
            amount
          );
          console.log(afterAmount);
          if (afterAmount > 0) {
            await AccountService.updateSenderAccount(senderAC, afterAmount)
              .then(async () => {
                const receiverAccount = await AccountService.findAmountByAc(
                  recieverAC
                );
                const totalAmount = await AccountService.totalAmount(
                  receiverAccount.amount,
                  amount
                );
                await AccountService.updateReceiverAccount(
                  recieverAC,
                  totalAmount
                );
              })
              .catch((err) => {
                res.status(400).send({ err: err.message });
              });
          } else {
            res.status(400).send({ err: "Not Enough Balance in Account" });
          }
        })
        .catch((err) => {
          res.status(400).send({ err: err.message });
        });

      res.status(201).send("Transaction is Successfuly Done");
    } else {
      return res.status(400).send({
        err: "Account Not Found!",
      });
    }
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
};
