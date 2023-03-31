
const jwt = require("jsonwebtoken")
const db = require('./db')

// userDetails = {
//     1000: { username: "anu", acno: 1000, password: "abc123", balance: 0, transaction: [] },
//     1001: { username: "arun", acno: 1001, password: "abc123", balance: 0, transaction: [] },
//     1002: { username: "amal", acno: 1002, password: "abc123", balance: 0, transaction: [] },
//     1003: { username: "mega", acno: 1003, password: "abc123", balance: 0, transaction: [] },
// }


register = (acno, uname, psw) => {
    //store the resolved output of findOne in variable user
    return db.User.findOne({ acno }).then(user => {
        //if acno present in db then get the object of that user else null response
        if (user) {
            return {
                status: false,
                messsage: "user already present",
                statusCode: 404
            }
        }
        else {
            newUser = new db.User({
                username: uname,
                acno,
                password: psw,
                balance: 0,
                transaction: []
            })
            newUser.save()
            return {
                status: true,
                messsage: "registred",
                statusCode: 200
            }
        }
    })
}




login = (acno, psw) => {

    return db.User.findOne({ acno, password: psw }).then(user => {
        if (user) {
            currentUser = user.username
            currentAcno = acno
            const token = jwt.sign({ acno }, "superkey123")

            return {
                status: true,
                messsage: "login success",
                statusCode: 200,
                currentUser,
                currentAcno,
                token
            }
        }
        else {
            return {
                status: false,
                messsage: "Incorrect acno or password",
                statusCode: 404
            }
        }
    })
}


deposit = (acno, psw, amnt) => {
    //to convert string amount to int
    var amount = parseInt(amnt)
    return db.User.findOne({ acno, password: psw }).then(user => {
        if (user) {
            user["balance"] += amount
            user.transaction.push({ Type: "credit", Amount: amount })
            user.save()
            return {
                status: true,
                messsage: `your account has been credited with amount ${amount} and the balance is ${user.balance}`,
                statusCode: 200,

            }
        }
        else {
            return {
                status: false,
                messsage: "Incorrect password",
                statusCode: 404
            }
        }
    })
}


withdrew = (acno, psw, amt) => {
    //to convert string amount to int
    var amount = parseInt(amt)

    return db.User.findOne({ acno, password: psw }).then(user => {
        if (user) {
            if (amount <= user.balance) {
                user.balance -= amount
                user.transaction.push({
                    type: "debit",
                    amount: amount
                })
                user.save()
                return {
                    status: true,
                    messsage: `your account has been debited with amount ${amount} and the balance is ${user.balance}`,
                    statusCode: 200,

                }
            }
            else {
                return {
                    status: false,
                    messsage: "Insufficient balance",
                    statusCode: 404
                }
            }
        }
        else {
            return {
                status: false,
                messsage: "Incorrect acno or password",
                statusCode: 404
            }

        }
    })
}

getTransaction = (acno) => {
    return db.User.findOne({ acno }).then(user => {
        if (user) {
            return {
                status: true,
                transaction: user.transaction,
                statusCode: 200
            }
        }
    })

}


module.exports = {
    register, login, deposit, withdrew, getTransaction
}