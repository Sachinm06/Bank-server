
const jwt = require("jsonwebtoken")

userDetails = {
    1000: { username: "anu", acno: 1000, password: "abc123", balance: 0, transaction: [] },
    1001: { username: "arun", acno: 1001, password: "abc123", balance: 0, transaction: [] },
    1002: { username: "amal", acno: 1002, password: "abc123", balance: 0, transaction: [] },
    1003: { username: "mega", acno: 1003, password: "abc123", balance: 0, transaction: [] },
}


register = (acno, uname, psw) => {
    if (acno in userDetails) {
        return {
            status: false,
            messsage: "user already present",
            statusCode: 404
        }
    }
    else {
        userDetails[acno] = { username: uname, acno, password: psw, balance: 0, transaction: [] }
        return {
            status: true,
            messsage: "registred",
            statusCode: 200
        }
    }
}


login = (acno, psw) => {
    if (acno in userDetails) {
        if (psw == userDetails[acno]["password"]) {
            //store current user
            currentUser = userDetails[acno]["username"]
            currentAcno = acno

            //token create
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
                messsage: "Incorrect password",
                statusCode: 404
            }
        }
    }
    else {
        return {
            status: false,
            messsage: "not registred yet",
            statusCode: 404
        }
    }
}


deposit = (acno, psw, amnt) => {
    //to convert string amount to int
    var amount = parseInt(amnt)

    if (acno in userDetails) {
        if (psw == userDetails[acno]["password"]) {
            userDetails[acno]["balance"] += amount

            //add transaction data
            userDetails[acno]["transaction"].push(
                {
                    type: "credit",
                    amount: amount
                }
            )

            return {
                status: true,
                messsage: `your account has been credited with amount ${amount} and the balance is ${userDetails[acno].balance}`,
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
    }
    else {
        return {
            status: false,
            messsage: "Incorrect acno",
            statusCode: 404
        }
    }
}


withdrew = (acno, psw, amt) => {
    //to convert string amount to int
    var amount = parseInt(amt)

    if (acno in userDetails) {
        if (psw == userDetails[acno]["password"]) {
            if (amount <= userDetails[acno]["balance"]) {
                userDetails[acno]["balance"] -= amount

                //add transaction data
                userDetails[acno]["transaction"].push(
                    {
                        type: "debit",
                        amount: amount
                    }
                )


                return {
                    status: true,
                    messsage: `your account has been debited with amount ${amount} and the balance is ${userDetails[acno]["balance"]}`,
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
                messsage: "Incorrect password",
                statusCode: 404
            }
        }
    }
    else {
        return {
            status: false,
            messsage: "Incorrect acno",
            statusCode: 404
        }
    }
}


getTransaction = (acno) => {
    return {
        status: true,
        transaction: userDetails[acno].transaction,
        statusCode: 200
    }
}


module.exports = {
    register, login, deposit, withdrew, getTransaction
}