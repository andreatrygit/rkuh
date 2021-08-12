module.exports = (req, res) => {
  if (req.query.qrcode-and-pin==="rkuh#shared#12345##12345")
  { 
    res.setHeader('Set-Cookie',["rkuh-session=''"]);
    res.status(200).json({"info":"logged-in#shared"});
  }
  else
  {
    res.setHeader('Set-Cookie',["rkuh-session=''"]);
    res.status(200).json({"error":"wrong qrCode and PIN."});
  }
}