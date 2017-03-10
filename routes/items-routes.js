//items info
const express = require('express');
const multer = require('multer');
const ensure = require('connect-ensure-login');

const itemRoutes = express.Router();

// This is for photos correct? Where should I file this to?
const uploads =multer({dest: __dirname + '/../public/uploads/'});

const Item = require('../models/item-model.js');

itemRoutes.get('/items/new',
  ensure.ensureLoggedIn(),(req, res, next)=>{
  res.render('items/new.ejs',{
    message: req.flash('success')
    });
  });

itemRoutes.get('/my-item',
  ensure.ensureLoggedIn(),(req, res, next)=>{
    Item.find((err, itemList) =>{
      if(err){
        next(err);
        return;
      }
    res.render('items/index.ejs',{
      item: itemList,
      message: req.flash('success')

  });
});
});

itemRoutes.get('/items/view',
  ensure.ensureLoggedIn(),(req, res, next)=>{
    Item.find((err, itemInfo) =>{
      if(err){
        next(err);
        return;
      }
    res.render('items/view.ejs',{
      item: itemInfo,
      message: req.flash('success')

  });
});
});

itemRoutes.post('/items',
  ensure.ensureLoggedIn(),
  uploads.fields([{name: 'itemPicture'},{name:'receiptPicture'}]),
  (req, res, next) =>{
    const itemName= req.body.itemName;
    const itemPicture= req.files.itemPicture.filename;
    const roomName= req.body.roomName;
    const datePurchased= req.body.datePurchased;
    const condition= req.body.condition;
    const brand= req.body.brand;
    const model= req.body.model;
    const retailer= req.body.retailer;
    const serialNumber= req.body.serialNumber;
    const purchasePrice= req.body.purchasePrice;
    const warranty= req.body.warranty;
    const warrantyNumber= req.body.warrantyNumber;
    const receiptPicture= req.files.receiptPicture.filename;

    const newItem=new Item({
      itemName: itemName,
      itemPicture: `/uploads/${itemPicture}`,
      roomName: roomName,
      datePurchased: datePurchased,
      condition: condition,
      brand: brand,
      model: model,
      retailer: retailer,
      serialNumber: serialNumber,
      purchasePrice: purchasePrice,
      warranty: warranty,
      warrantyNumber: warrantyNumber,
      receiptPicture: `/uploads/${receiptPicture}`,

    });

    newItem.save ((err) => {
    if (err) { return next(err); }
    else {
      req.flash('success', 'Your item has been created.');
      res.redirect('/my-item');
    }
  });
  });

  itemRoutes.get('/item/:id', ensure.ensureLoggedIn(), (req, res, next) =>{
    let itemId = req.params.id;
    Item.findById(itemId, (err, item) =>{
      if (err){return next(err);}
      console.log(item);
      res.render('items/view', {item:item});
    });
  });

//edit item?
  itemRoutes.get('/item/:id/edit', ensure.ensureLoggedIn(), (req, res, next) => {
  let itemId = req.params.id;

  Item.findById(itemId, (err, item) => {
    if (err) { return next(err); }
    res.render('items/edit', { item: item });
  });
});

itemRoutes.post('/:id',
  ensure.ensureLoggedIn(),
  uploads.single('itemPicture','receiptPicture'),
  (req, res, next) => {
  const itemId = req.params.id;{

  const itemName= req.body.itemName;
  const itemPicture= req.file.filename;
  const roomName= req.body.roomName;
  const datePurchased= req.body.datePurchased;
  const condition= req.body.condition;
  const brand= req.body.brand;
  const model= req.body.model;
  const retailer= req.body.retailer;
  const serialNumber= req.body.serialNumber;
  const purchasePrice= req.body.purchasePrice;
  const warranty= req.body.warranty;
  const warrantyNumber= req.body.warrantyNumber;
  const receiptPicture= req.file.filename;

//what should this be? not a new item
  const newItem=new Item({
    itemName: itemName,
    itemPicture: `/uploads/${itemPicture}`,
    roomName: roomName,
    datePurchased: datePurchased,
    condition: condition,
    brand: brand,
    model: model,
    retailer: retailer,
    serialNumber: serialNumber,
    purchasePrice: purchasePrice,
    warranty: warranty,
    warrantyNumber: warrantyNumber,
    receiptPicture: `/uploads/${receiptPicture}`,
  });
}
  Item.findByIdAndUpdate(itemId, updates, (err, itemId) => {
    if (err){ return next(err); }
    return res.redirect('/my-item');
  });
});

//delete item?

itemRoutes.post('/:id/delete', (req, res, next) => {
  let itemId = req.params.id;

  Item.findByIdAndRemove(id, (err, item) => {
    if (err){ return next(err); }
    return res.redirect('/my-item');
  });

});

module.exports = itemRoutes;
