module.exports = (req, res) => {
  if (req.query.pin==="12345")
  { 
    res.setHeader('Set-Cookie',["rkuh-session=@@@@@"]);
    res.status(200).json({"info":"logged-in"});
  }
  else
  {
    setTimeout(()=>res.status(200).json({}),4000)
    
  }
}