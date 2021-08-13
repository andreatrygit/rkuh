module.exports = (req, res) => {
    if (req.query.qrcode==="rkuh-clocking-12345")
    { 
      res.setHeader('Set-Cookie',["rkuh-session=''"]);
      res.status(200).json({"info":"clocked correctly"});
    }
    else
    {
      res.setHeader('Set-Cookie',["rkuh-session=''"]);
      res.status(200).json({"error":"wrong qrCode."});
    }
  }