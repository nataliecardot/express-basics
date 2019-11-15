const express = require('express');
const router = express.Router();
const members = require('../../members');
const uuid = require('uuid');

// Return members JSON for get request from this route/endpoint
router.get('/', (req, res) =>
  // When sending data to a web server, the data has to be a string. members variable holds a JOSn object but should be a JSON string representation. However, don't need to use JSON.stringify() when using Express; with res.json(), the conversion is done for you. It does JSON.stringify(object, replacer, space), and once this method is called, the res.json() method will then call res.send() as well, under the hood
  res.json(members));

// Get single member JSON
/* Route parameters are named URL segments used to capture the values specified at their position in the URL. The named segments are prefixed with a colon and then the name (e.g. /:your_parameter_name/. The captured values are stored in the req.params object using the parameter names as keys (e.g., req.params.your_parameter_name). https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes */
router.get('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    // Have to wrap req.params.id in parseInt because req.params.id sends it as a string (triple equals used so types must match)
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }

});

// Create member from request body, add to members array
// Whenever you're creating something on the server or adding to a database, you want to create a POST request
router.post('/', (req, res) => {
  const newMember = {
    // Also when you're working with a database, IDs are typically created for you. Using uuid package to generate random ID
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: 'Please include a name and email' });
  }

  members.push(newMember);
  // Need to send response. The response is up to you, but here returning entire members array
  res.json(members);
});

// Update member
// When you update something on the server, in most cases it's a PUT request
router.put('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    const updMember = req.body;
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;

        // Destructuring being used for member; same as member: member (returning updated member)
        res.json({ msg: 'Member updated', member });
      }

    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }

});

// Delete member
router.delete('/:id', (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    // Returns all members except member requested to be deleted
    res.json({
      msg: 'Member deleted',
      members: members.filter(member => member.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }

});

module.exports = router;