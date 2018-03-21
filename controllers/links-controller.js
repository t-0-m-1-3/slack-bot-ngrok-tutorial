/*
 * links-controller.js
 * Copyright (C) 2018 t0m <t0m@asuntu>
 *
 * Distributed under terms of the MIT license.
 */

// const Link = require('../models/link');
const linksController = {};
//
//index root route
linksController.index = (req,res) => {
      LInk.findAll()
           .then(links => {
           console.log('inside index controller vars next: ', req.params, links)
           res.render('links/links', {
           // keyPublishable: keyPublishable,
           currentPage: 'links/links',
           links: links})
           })
.catch(err => {
          res.status(400).json(err)
          })
};


//.show()
linksController.show = (req,res) => {
  console.log(req.params)
  console.log('about to go into link.findById() ')
      Links.findById(req.params.id)
            .then(links => {
            res.render('links/show',{
           links: links
            })
          }).catch(err => {
          res.status(400).json(err)
          })
};

linksController.update = (req,res) => {
  console.log(req.params)
  console.log('about to go into link.update() '+ req.params.id);
      Link.update({
        url: req.body.url
        name: req.body.name,
        },
             req.params.id)
          .then(() => {
            res.send(`../${req.params.id}`)
          })
          .catch(err => {
            res.status(400).json(err)
          })
};

//.create()
linksController.create = (req,res) => {
  console.log('hitting controller Create');
  console.log(req.body);
  console.log("\n");
      Link.create({
        url: req.body.url,
        name: req.body.name,
        })
          .then(links => {
            res.send(`/links/${links.id}`)
          }).catch(err => {
            res.status(400).json(err);
          });
};
//.destroy()
linksController.destroy = (req,res) => {
      Link.destroy(req.params.id)
            .then(() => {
            console.log('you just deleted link: ' + req.params.id)
            // res.send('/links')
            })
            .catch(err => {
            res.status(400).json(err);
            });
};


module.exports = linksController;
