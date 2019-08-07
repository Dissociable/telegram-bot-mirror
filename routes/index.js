const express = require('express')
const request = require('request')
const router = express.Router()

const sendRequest = function(token, action, form, callback){
  request.post({
    url: `https://api.telegram.org/bot${token}/${action}`,
    form
  }, function(err, res, body){
    if(err){
      return callback({ ok: false, err: err })
    }
    callback({ ok: true, res: res })
  })
}

router.get(`/bot:token/:action`, (req, res) => {
  const token = req.params.token
  const action = req.params.action
  const form = req.query

  sendRequest(token, action, form, function(reqRes){
    res.json(reqRes)
  })
})

router.get('/:query', (req, res) => res.redirect('/'))

module.exports = router
