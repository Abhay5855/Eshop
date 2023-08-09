

exports.Generic = (req, res) => {

       res.json({
        message : "Success",
        data : req.body,
      })
}