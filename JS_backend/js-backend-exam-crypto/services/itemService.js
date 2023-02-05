const Item = require("../models/Item");

async function getAll() {
  return await Item.find({}).lean();
}

// async function getAllByUser(userId) {
//   const items = await Item.find({}).lean();
//   return items.filter((b) =>
//     b.wishList.map((b) => b.toString()).includes(userId._id)
//   );
// }

async function getAllByStr(nameStr, methodStr) {
  let items = await Item.find({ method: methodStr }).lean();
  const nameStrI = nameStr.toLowerCase();
  items = items.filter((i) => i.name.toLowerCase().includes(nameStrI));
  return items;
}

async function getItem(itemId) {
  return await Item.findById(itemId).lean();
}

async function createItem(item) {
  await Item.create(item);
}

async function subscribeItem(itemId, userId) {
  const item = await Item.findById(itemId);
  item.subscribeList.push(userId);

  await item.save();
}

async function updateItem(itemId, updatedItem) {
  const item = await Item.findById(itemId);

  Object.assign(item, updatedItem);

  await item.save();
}

async function deleteItem(itemId) {
  await Item.findByIdAndRemove(itemId);
}

module.exports = {
  createItem,
  getAll,
  getAllByStr,
  //   getAllByUser,
  getItem,
  subscribeItem,
  updateItem,
  deleteItem,
};
