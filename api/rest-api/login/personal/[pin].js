module.exports = (req, res) => {
  if (req.query.pin==="12345")
  { 
    res.setHeader('Set-Cookie',["rkuh-session=@@@@@"]);
    res.status(200).json({"info":"logged-in"});
  }
  else
  {
    res.setHeader('Set-Cookie',["rkuh-session=''"]);
    res.status(404).json({});
  }
}