module.exports = (req, res) => {
  if (req.query.pin==="12345")
  { 
    res.setHeader('Set-Cookie',["rkuh-session=@@@@@"]);
    res.status(200).json({"info":"logged-in#personal"});
  }
  else
  {
    res.setHeader('Set-Cookie',["rkuh-session=''"]);
    res.status(200).json({"error":"wrong PIN"});
  }
}