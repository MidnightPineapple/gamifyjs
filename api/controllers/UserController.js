module.exports = {

  // TODO: use policy to check permissions before allowing methods other than store

  index: async function (req, res) {
    const users = await User.find()
    return res.json(users)
  },

  show: async function (req, res) {
    const user = await User.findOne(req.params.id)
    return res.json(user)
  },

  store: async function (req, res) {
    const user = await User.create(req.body).fetch()
    return res.json(user)
  },

  update: async function (req, res) {
    const user = await User.update(req.params.id)
    .set(req.body).fetch()
    return res.json(user)
  },

  destroy: async function (req, res) {
    await User.destroy(req.params.id)
    return res.ok()
  }

};