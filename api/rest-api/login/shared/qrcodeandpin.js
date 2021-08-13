module.exports = (req, res) => {
  
 
    res.setHeader('Set-Cookie',["rkuh-session=''"]);
    res.status(200).json({"info":req.query.name});
 
}