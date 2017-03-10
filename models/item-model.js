const mongoose = require("mongoose");

const Schema   =  mongoose.Schema;

const itemSchema =  new Schema({
    itemName: String,
    itemPicture: String,
    roomName: String,
    datePurchased: String,
    condition: String,
    brand: String,
    model: String,
    retailer: String,
    serialNumber: String,
    purchasePrice: String,
    warranty: String,
    warrantyNumber: String,
    receiptPicture: String,
    owner:{type: Schema.Types.ObjectId, ref: 'User'}
    }, {
      timestamps: { createdAt: "created_at", updatedAt: "updated_at" },

});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
