module.exports = (req, res) => {
    if (req.query.qrcode==="rkuh-shared-12345" && req.query.pin==='12345')
    { 
      res.setHeader('Set-Cookie',["rkuh-session=''"]);
      res.status(200).json({"info":"logged-in: shared"});
    }
    else
    {
      res.setHeader('Set-Cookie',["rkuh-session=''"]);
      res.status(200).json({"error":"wrong PIN or qrCode."});
    }
  }