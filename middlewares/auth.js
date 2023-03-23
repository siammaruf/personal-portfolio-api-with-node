const  jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    try{
        const authHeader = req.headers['authorization']
        if (!authHeader) return res.status(401).json({
            error: true,
            message: "You are not authorized!"
        })

        const token = authHeader.split(' ')[1]
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_PRIVATE_KEY,
            (err, decoded) => {
                if (err) return res.status(401).json({
                    error: true,
                    message: "The token was not valid!"
                })

                req.user = decoded.username;
                next();
            }
        )
    }catch (ex) {
        for(let field in ex.errors)
            console.log(ex.errors[field].message)
    }
}

module.exports = authMiddleware